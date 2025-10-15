import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PencilRuler } from "lucide-react";
import type { FC } from "react";
import { Toggle } from "@/components/ui/toggle";

interface DescriptionProps {
  updateAttributes: (attributes: Record<string, any>) => void;
  description: string;
  descriptionVisible: boolean;
}

const Description: FC<DescriptionProps> = (props) => {
  const onChangeDescription = (visible: boolean) => {
    props.updateAttributes({
      description: !visible ? "" : "这是一段描述",
      descriptionVisible: visible,
    });
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          pressed={props.descriptionVisible}
          onPressedChange={(visible: boolean) => onChangeDescription(visible)}
          asChild
        >
          <Button variant="ghost" className="px-2 py-1 h-6">
            <PencilRuler style={{ width: "16px" }} />
          </Button>
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p>图片描述</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default Description;
