import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "./button";
import { Check, ChevronRight } from "lucide-react";
import { ColorPicker } from "@douyinfe/semi-ui";

interface ColorPickerProps {
  children: React.ReactNode;
  onChange: (color: string) => void;
  defaultColor: string;
  hasGradient?: boolean;
}

const ColorBlock = ({
  name,
  value,
  gradation,
  onNodeClick,
  defaultColor,
}: {
  name?: string;
  value: string;
  gradation?: string;
  onNodeClick: (color: string) => void;
  defaultColor: string;
}) => {
  return (
    <div
      onClick={() => onNodeClick(value)}
      className="w-[24px] h-[24px] p-[2px] border-transparent border-[1px] hover:border-gray-300 dark:hover:border-gray-500 rounded-[2px] flex cursor-pointer"
    >
      <span
        style={{
          ...(gradation
            ? { backgroundImage: gradation }
            : { backgroundColor: value }),
        }}
        className={`w-full h-full relative`}
        title={name}
      >
        {value === defaultColor && (
          <Check
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "16px",
              color: [
                "rgb(255, 255, 255)",
                "rgb(250, 250, 250)",
                "rgb(250, 250, 250)",
                "rgb(244, 245, 245)",
                "rgb(239, 240, 240)",
                'rgb(231, 233, 232)'
              ].includes(value)
                ? "#333"
                : "#eee",
            }}
          />
        )}
      </span>
    </div>
  );
};

const ColorPickers = ({
  children,
  onChange,
  defaultColor,
}: ColorPickerProps) => {
  const [colorData] = useState([
    [
      {
        name: "黑色",
        value: "rgb(0, 0, 0)",
      },
      {
        name: "深灰 3",
        value: "rgb(38, 38, 38)",
      },
      {
        name: "深灰 2",
        value: "rgb(88, 90, 90)",
      },
      {
        name: "深灰 1",
        value: "rgb(138, 143, 141)",
      },
      {
        name: "灰色",
        value: "rgb(216, 218, 217)",
      },
      {
        name: "浅灰 4",
        value: "rgb(231, 233, 232)",
      },
      {
        name: "浅灰 3",
        value: "rgb(239, 240, 240)",
      },
      {
        name: "浅灰 2",
        value: "rgb(244, 245, 245)",
      },
      {
        name: "浅灰 1",
        value: "rgb(250, 250, 250)",
      },
      {
        name: "白色",
        value: "rgb(255, 255, 255)",
      },
    ],
    [
      {
        name: "红色",
        value: "rgb(223, 42, 63)",
      },
      {
        name: "橘橙",
        value: "rgb(237, 116, 12)",
      },
      {
        name: "金盏黄",
        value: "rgb(236, 170, 4)",
      },
      {
        name: "柠檬黄",
        value: "rgb(251, 222, 40)",
      },
      {
        name: "绿色",
        value: "rgb(116, 182, 2)",
      },
      {
        name: "青色",
        value: "rgb(29, 192, 201)",
      },
      {
        name: "浅蓝",
        value: "rgb(17, 124, 238)",
      },
      {
        name: "蓝色",
        value: "rgb(47, 75, 218)",
      },
      {
        name: "紫色",
        value: "rgb(96, 27, 222)",
      },
      {
        name: "玫红",
        value: "rgb(210, 45, 141)",
      },
    ],
  ]);

  const onNodeClick = (color: string) => {
    onChange(color);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        style={{ width: "fit-content" }}
      >
        <Button
          variant="ghost"
          className="h-8 w-full flex rounded-[2px] justify-start mt-1 mb-2 px-2"
        >
          <div
            onClick={() => onNodeClick("rgb(38, 38, 38)")}
            className="w-[24px] h-[24px] p-[2px] border-transparent border-[1px] hover:border-gray-300 dark:hover:border-gray-500 rounded-[2px] flex cursor-pointer"
          >
            <span
              style={{ backgroundColor: "rgb(38, 38, 38)" }}
              className="w-full h-full"
            ></span>
          </div>
          默认
        </Button>
        <div className="px-2 flex flex-col gap-[2px]">
          {colorData.map((group, gIndex) => (
            <div key={gIndex} className="flex items-center color-group">
              {group.map((item) => (
                <ColorBlock
                  key={item.value}
                  name={item.name}
                  value={item.value}
                  onNodeClick={onNodeClick}
                  defaultColor={defaultColor}
                />
              ))}
            </div>
          ))}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-full flex rounded-[2px] justify-start mt-2 px-2 border-t-[1px] border-t-gray-200 dark:border-t-[#333]"
            >
              <div className="more-color flex justify-between w-full">
                <div className="flex gap-2 items-center">
                  <img
                    src="https://gw.alipayobjects.com/mdn/rms_740edc/afts/img/A*G6CzS7jByMIAAAAAAAAAAABkARQnAQ"
                    alt=""
                    className="w-[17px] h-[17px]"
                  />
                  更多颜色
                </div>
                <ChevronRight className="w-[12px] h-[12px]" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="center"
            side="right"
            style={{ width: "fit-content" }}
          >
            <ColorPicker
              alpha={true}
              onChange={(value) => {
                console.log(value);
              }}
              height={150}
              eyeDropper={false}
            />
          </PopoverContent>
        </Popover>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPickers;
