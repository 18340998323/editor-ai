import type { Editor } from "@tiptap/core";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FC,
} from "react";

interface ImageResizeProps {
  descriptionVisible: boolean;
  align: string;
  src: string;
  name: string;
  width: number;
  height: number;
  editor: Editor;
  description: string;
  updateAttributes: (attributes: Record<string, any>) => void;
  originRatio: number;
}

const ImageResize: FC<ImageResizeProps> = ({
  descriptionVisible,
  align,
  src,
  name,
  width,
  height: _height, // 重命名避免未使用警告
  editor,
  description,
  updateAttributes,
  originRatio,
}) => {
  const id = useId();
  const mouseDownRef = useRef(false);
  const moveX = useRef(0);
  const moveStateRef = useRef({
    moveX: 0,
    width: 0,
    height: 0,
    moving: false,
    dir: "",
  });

  // 只用于UI显示的状态，避免频繁更新
  const [displayState, setDisplayState] = useState({
    width: 0,
    height: 0,
    moving: false,
  });

  const onMouseDown = useCallback(
    (
      event: React.MouseEvent<HTMLDivElement>,
      dir: "top-right" | "top-left" | "bottom-left" | "bottom-right"
    ) => {
      mouseDownRef.current = true;
      const imageDome = document.querySelector(`#${id}`);
      const { width, height } = imageDome!.getClientRects()[0];

      // 更新 ref 中的状态
      moveStateRef.current = {
        ...moveStateRef.current,
        width: width,
        height: height,
        moveX: event.clientX,
        dir,
        moving: true,
      };

      // 更新显示状态
      setDisplayState({
        width: width,
        height: height,
        moving: true,
      });

      moveX.current = event.clientX;
    },
    [id]
  );

  // 使用节流来减少更新频率
  const throttleRef = useRef<NodeJS.Timeout | null>(null);

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (moveStateRef.current.moveX <= 0) return;
      if (!mouseDownRef.current) return;
      console.log(2);

      const { clientX } = event;
      const distance = clientX - moveX.current;
      const newWidth = moveStateRef.current.width + distance;
      const newHeight = moveStateRef.current.height + distance / originRatio;

      // 更新 ref 中的实时值
      moveStateRef.current = {
        ...moveStateRef.current,
        moveX: clientX,
        width: newWidth,
        height: newHeight,
      };

      // 节流更新显示状态，避免过度渲染
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }

      throttleRef.current = setTimeout(() => {
        setDisplayState({
          width: Math.round(newWidth),
          height: Math.round(newHeight),
          moving: true,
        });
      }, 0); // 约60fps的更新频率

      moveX.current = clientX;
    },
    [originRatio]
  );
  const onMouseUp = useCallback(() => {
    if (mouseDownRef.current) {
      mouseDownRef.current = false;
      console.log(3);
      // 清除节流定时器
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
        throttleRef.current = null;
      }

      // 更新最终状态
      setDisplayState((prev) => ({
        ...prev,
        moving: false,
      }));

      // 重置 ref 状态
      moveStateRef.current = {
        ...moveStateRef.current,
        moving: false,
        dir: "",
      };

      moveX.current = 0;

      // 应用最终尺寸
      updateAttributes({
        width: Math.round(moveStateRef.current.width),
        height: Math.round(moveStateRef.current.height),
        ratio: moveStateRef.current.width / moveStateRef.current.height,
      });
    }
  }, [updateAttributes]);
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      // 清理定时器
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div className={`${descriptionVisible ? "pb-7" : ""} w-full`}>
      <div
        className={`image-container w-fit h-auto relative ${
          align === "center"
            ? "mx-auto"
            : align === "start"
            ? "ml-0 mr-auto"
            : "mr-0 ml-auto"
        }`}
      >
        <img
          src={src}
          alt={name || "上传的图片"}
          width={width}
          className="rounded-sm cursor-pointer"
          id={id}
        />
        {editor.isActive("uploadImage") && (
          <div
            className={`mask absolute border-blue-400 border-[1px] top-0 z-0`}
            style={{
              background: displayState.moving ? "rgba(0,0,0,.2)" : "",
              width: displayState.moving ? displayState.width + "px" : "100%",
              height: displayState.moving ? displayState.height + "px" : "100%",
            }}
          >
            <div
              className="bottom-right right-0 bottom-0 absolute w-[15px] h-[15px] rounded-[50%] bg-blue-400 border-white border-2 translate-x-[50%] translate-y-[50%] cursor-nwse-resize"
              onMouseDown={(event) => onMouseDown(event, "bottom-right")}
            ></div>
            <div
              className="top-right right-0 top-0 absolute w-[15px] h-[15px] rounded-[50%] bg-blue-400 border-white border-2 translate-x-[50%] -translate-y-[50%] cursor-nesw-resize"
              onMouseDown={(event) => onMouseDown(event, "top-right")}
            ></div>
            <div
              className="bottom-left left-0 bottom-0 absolute w-[15px] h-[15px] rounded-[50%] bg-blue-400 border-white border-2 -translate-x-[50%] translate-y-[50%] cursor-nesw-resize"
              onMouseDown={(event) => onMouseDown(event, "bottom-left")}
            ></div>
            <div
              className="top-left left-0 top-0 absolute w-[15px] h-[15px] rounded-[50%] bg-blue-400 border-white border-2 -translate-x-[50%] -translate-y-[50%] cursor-nwse-resize"
              onMouseDown={(event) => onMouseDown(event, "top-left")}
            ></div>
            {displayState.moving && (
              <span className="flex absolute left-1/2 top-1/2 -translate-1/2 text-gray-50 text-[14px]">
                {displayState.width} X {displayState.height}
              </span>
            )}
          </div>
        )}
        {descriptionVisible && (
          <div className="description flex justify-center absolute left-0 right-0 bottom-0 translate-y-[130%]">
            <input
              type="text"
              className="outline-0 border-0 w-full text-center text-gray-600 text-[16px] dark:text-gray-400"
              value={description}
              placeholder="添加图片描述"
              onChange={(event) =>
                updateAttributes({
                  description: event.target.value,
                })
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageResize;
