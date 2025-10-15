import type { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AlginImageProps {
  updateAttributes: (attributes: Record<string, any>) => void;
  align: string;
}

const AlginImage: FC<AlginImageProps> = (props) => {
  const { align, updateAttributes } = props;

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 px-1 h-6">
              {
                align === 'start'?<AlignLeft />: align === 'center'?<AlignCenter />: <AlignRight />
              }
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>对齐方式</p>
        </TooltipContent>
        <DropdownMenuContent className="w-fit" align="start">
          <DropdownMenuLabel>对齐方式</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={align}
            onValueChange={(value: string) =>
              updateAttributes({ align: value })
            }
          >
            <DropdownMenuRadioItem value="start">
              <AlignLeft />
              左对齐
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="center">
              <AlignCenter />
              居中
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="end">
              <AlignRight />
              右对齐
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </Tooltip>
    </DropdownMenu>
  );
};

export default AlginImage;
