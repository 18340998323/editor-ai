import type { Editor } from "@tiptap/core";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListCheck,
  ListOrdered,
  Table,
  Image,
  Minus,
  Quote,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useEffect, useRef } from "react";

const formatIconMap = {
  h1: <Heading1 style={{ width: "16px" }} />,
  h2: <Heading2 style={{ width: "16px" }} />,
  h3: <Heading3 style={{ width: "16px" }} />,
  h4: <Heading4 style={{ width: "16px" }} />,
  h5: <Heading5 style={{ width: "16px" }} />,
  h6: <Heading6 style={{ width: "16px" }} />,
  bulletList: <List style={{ width: "16px" }} />,
  orderList: <ListOrdered style={{ width: "16px" }} />,
  taskList: <ListCheck style={{ width: "16px" }} />,
  blockQuote: <Quote style={{ width: "16px" }} />,
  codeBlock: <Code style={{ width: "16px" }} />,
  table: <Table style={{ width: "16px" }} />,
  image: <Image style={{ width: "16px" }} />,
  horizontalRule: <Minus style={{ width: "16px" }} />,
};

interface MenuItemProps {
  label: string;
  value: string;
  type: string;
  [key: string]: any;
}

const Suggestion = (props: { editor: Editor; items: MenuItemProps[] }) => {
  const { items: list, editor } = props;
  const onMenuClick = (item: MenuItemProps) => {
    switch (item.value) {
      case "h1":
        editor.commands.deleteRange({
          from: editor.state.selection.from-1,
          to: editor.state.selection.from,
        });
        editor.commands.insertContentAt(
          editor.state.selection.from - 1,
          {
            type: 'heading',
            attrs: { level: item.attrs.level },
            updateSelection: true,
            parseOptions: {
              preserveWhitespace: "full",
            },
          }
        );
        editor.commands.focus()
        break;
      case "other":
        break;
    }
  };

  const CommandRef = useRef(null)

  useEffect(() => {
    // CommandRef.current?.focus()
  },[])

  return (
    <ScrollArea className="border max-h-[300px] w-[150px] rounded-lg">
      <Command className="shadow-md "ref={CommandRef}>
        <CommandList>
          <CommandGroup heading="格式">
            {list
              .filter((item) => item.type === "format")
              .map((item) => (
                <CommandItem key={item.value} className="cursor-pointer">
                  <Button
                    variant="ghost"
                    className=" p-0 h-5 gap-[6px] text-[13px]"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      onMenuClick(item);
                    }}
                  >
                    <span className="text-[13px]">
                      {formatIconMap[
                        item.value as keyof typeof formatIconMap
                      ] || null}
                    </span>
                    <span className="text-[13px]">{item.label}</span>
                  </Button>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="其他">
            {list
              .filter((item) => item.type === "other")
              .map((item) => (
                <CommandItem key={item.value} className="cursor-pointer">
                  <Button
                    variant="ghost"
                    className="p-0 h-5 gap-[6px] text-[13px]"
                  >
                    <span className="text-[13px]">
                      {formatIconMap[
                        item.value as keyof typeof formatIconMap
                      ] || null}
                    </span>
                    <span className="text-[13px]">{item.label}</span>
                  </Button>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </ScrollArea>
  );
};

export default Suggestion;
