import { Button } from "@/components/ui/button";
import type { ReactNodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { Image, PlusIcon, Upload, AlertCircle, RotateCcw } from "lucide-react";
import { useState, useRef, useCallback, useEffect, useId } from "react";
import { uploadImage, validateFile } from "@/utils/upload";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ImageStyle from "./ImageStyle";
import AlginImage from "./AlginImage";
import Description from "./Description";
import ImageResize from "./ImageResize";

export default (props: ReactNodeViewProps<HTMLLabelElement>) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    src,
    name,
    ratio,
    align,
    width,
    height,
    originRatio,
    rotate,
    originHeight,
    originWidth,
    description,
    descriptionVisible,
  } = props.node.attrs;
  const { editor } = props;
  const [state, setState] = useState({
    width: 0,
    height: 0,
    ratio: "75%",
    align: "start",
    rotate: 0,
    originRatio: 0,
  });

  useEffect(() => {
    const { ratio, align, width, height, originRatio, rotate } =
      props.node.attrs;
    setState({
      ratio,
      align,
      width,
      height,
      originRatio,
      rotate,
    });
  }, [props.node.attrs]);

  const getImageDimensions = useCallback((file: File) => {
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const img = new window.Image();
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        URL.revokeObjectURL(objectUrl);
        resolve({ width, height });
      };
      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("图片读取失败"));
      };
      img.src = objectUrl;
    });
  }, []);

  // 处理文件上传
  const handleFileUpload = useCallback(
    async (files: FileList | File[]) => {
      const file = Array.from(files)[0];
      if (!file) return;

      // 验证文件
      const validation = validateFile(file);
      if (!validation.valid) {
        setError(validation.error || "文件验证失败");
        toast.error(validation.error || "文件验证失败");
        return;
      }

      setIsUploading(true);
      setError(null);
      setUploadProgress(0);

      try {
        const [result, dims] = await Promise.all([
          uploadImage(file, {
            onProgress: (progress) => {
              setUploadProgress(progress);
            },
          }),
          getImageDimensions(file),
        ]);
        const originRatio = Number(Number(dims.width / dims.height).toFixed(2));
        // 更新节点属性
        props.updateAttributes({
          src: result.url,
          name: result.name,
          width: dims.width * (ratio / 100),
          height: dims.height * (ratio / 100),
          originRatio,
          originWidth: dims.width,
          originHeight: dims.height,
        });

        toast.success("图片上传成功");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "上传失败";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [props]
  );

  // 点击上传
  const onOpenUploadImage = () => {
    fileInputRef.current?.click();
  };

  // 处理文件选择
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFileUpload(files);
    }
    // 清空 input 值，允许重复选择同一文件
    event.target.value = "";
  };

  // 拖拽事件处理
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileUpload(files);
      }
    },
    [handleFileUpload]
  );

  const onSetImageAlgin = (type: string) => {
    switch (type) {
      case "start":
        props.updateAttributes({
          align: "start",
        });
        break;
      case "center":
        props.updateAttributes({
          align: "center",
        });
        break;
      default:
        props.updateAttributes({
          align: "end",
        });
        break;
    }
  };

  // 如果已经有图片，显示图片预览
  if (src) {
    return (
      <NodeViewWrapper className="upload-image">
        <Popover>
          <PopoverTrigger asChild>
            <div className="w-full">
              <ImageResize
                descriptionVisible={descriptionVisible}
                align={align}
                src={src}
                name={name}
                width={width}
                height={height}
                editor={editor}
                updateAttributes={props.updateAttributes}
                description={description}
                originRatio={originRatio}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent side="top" className="px-2 py-1 w-fit">
            <div className="flex gap-1 justify-between items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="p-0 px-1 h-6"
                    onClick={() => onSetImageAlgin("start")}
                  >
                    <RotateCcw style={{ width: "16px" }} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>逆时针旋转90度</p>
                </TooltipContent>
              </Tooltip>
              <ImageStyle
                updateAttributes={props.updateAttributes}
                width={width}
                height={height}
                originRatio={originRatio}
                ratio={ratio}
                originHeight={originHeight}
                originWidth={originWidth}
              />
              <AlginImage
                updateAttributes={props.updateAttributes}
                align={align}
              />
              <Description
                updateAttributes={props.updateAttributes}
                description={description}
                descriptionVisible={descriptionVisible}
              />
            </div>
          </PopoverContent>
        </Popover>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="upload-image">
      <div
        className={`w-full h-[300px] border-dashed border-2 rounded-md p-4 flex flex-col items-center justify-center gap-3 transition-colors ${
          isDragOver
            ? "border-blue-400 bg-blue-50"
            : error
            ? "border-red-300 bg-red-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {error && (
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {isUploading ? (
          <>
            <Upload className="w-8 h-8 text-blue-500 animate-pulse" />
            <span className="text-blue-600">上传中... {uploadProgress}%</span>
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </>
        ) : (
          <>
            <Image className="w-8 h-8 text-gray-400" />
            <span className="text-gray-500 text-center">
              拖拽图片到此处上传
              <br />
              <span className="text-xs text-gray-400">
                支持 JPG、PNG、GIF、WebP 格式，最大 5MB
              </span>
            </span>
            <Button
              size="sm"
              className="w-fit py-2 px-4 h-auto"
              onClick={onOpenUploadImage}
              disabled={isUploading}
            >
              <PlusIcon className="w-4 h-4" />
              选择图片
            </Button>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </NodeViewWrapper>
  );
};
