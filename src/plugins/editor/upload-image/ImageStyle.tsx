import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";
import { useEffect, useState, type FC } from "react";

interface ImageStyleProps {
  updateAttributes: (attributes: Record<string, any>) => void;
  width: number;
  height: number;
  ratio: number;
  originRatio: number;
  originWidth: number;
  originHeight: number;
}

const ImageStyle: FC<ImageStyleProps> = (props) => {
  const { updateAttributes, ratio, originRatio, originWidth, originHeight } =
    props;
  const [state, setState] = useState({
    width: 0,
    height: 0,
    ratio: 75,
    originRatio: 0,
  });
  useEffect(() => {
    const { ratio, width, height, originRatio } = props;
    setState({
      ratio,
      width,
      height,
      originRatio,
    });
  }, [props]);

  const onConfirmChangeImageWidth = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.keyCode === 13) {
      const value = Number(event.currentTarget.value);
      if (!Number.isNaN(value)) {
        updateAttributes({
          width: value,
          height: value / originRatio,
          ratio: value / (value / originRatio),
        });
      }
    }
  };
  const onConfirmChangeImageHeight = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const value = Number(event.currentTarget.value);
      if (!Number.isNaN(value)) {
        updateAttributes({
          width: value * originRatio,
          height: value,
          ratio: (value * originRatio) / value,
        });
      }
    }
  };
  const onRatioChange = (ratio: string) => {
    updateAttributes({
      ratio: Number(ratio),
      width: originWidth * (Number(ratio) / 100),
      height: originHeight * (Number(ratio) / 100),
    });
    setState((prev) => ({
      ...prev,
      width: originWidth * (Number(ratio) / 100),
      height: originHeight * (Number(ratio) / 100),
      ratio:  Number(ratio)
    }));
  };
  return (
    <Tooltip>
      <Popover>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="p-0 px-1 h-6">
              <Ruler style={{ width: "16px" }} />
            </Button>
          </TooltipTrigger>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="flex flex-col gap-2">
            <div className="flex gap-3 items-center">
              <div className="width flex gap-2 items-center">
                宽
                <Input
                  placeholder="请输入宽"
                  style={{ height: "25px", borderRadius: "2px" }}
                  type="number"
                  value={state.width}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setState((prev) => ({
                      ...prev,
                      width: Number(event.currentTarget.value),
                    }))
                  }
                  onKeyUp={onConfirmChangeImageWidth}
                ></Input>
              </div>
              <div className="height flex gap-1 items-center">
                高
                <Input
                  placeholder="请输入宽"
                  style={{ height: "25px", borderRadius: "2px" }}
                  type="number"
                  value={state.height}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setState((prev) => ({
                      ...prev,
                      height: Number(event.currentTarget.value),
                    }))
                  }
                  onKeyUp={onConfirmChangeImageHeight}
                ></Input>
              </div>
            </div>
            <Tabs
              value={state.ratio.toString()}
              className="w-full"
              onValueChange={onRatioChange}
            >
              <TabsList className="w-full h-7">
                <TabsTrigger
                  value="25"
                  className="cursor-pointer px-x py-0.5 h-6"
                >
                  25%
                </TabsTrigger>
                <TabsTrigger
                  value="50"
                  className="cursor-pointer px-x py-0.5 h-6"
                >
                  50%
                </TabsTrigger>
                <TabsTrigger
                  value="75"
                  className="cursor-pointer px-x py-0.5 h-6"
                >
                  75%
                </TabsTrigger>
                <TabsTrigger
                  value="100"
                  className="cursor-pointer px-x py-0.5 h-6"
                >
                  100%
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </PopoverContent>
        <TooltipContent>
          <p>宽高</p>
        </TooltipContent>
      </Popover>
    </Tooltip>
  );
};

export default ImageStyle;
