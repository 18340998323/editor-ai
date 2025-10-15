import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { emojiList } from "@/lib/emoji";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "@/store";
import { updateActiveArticle } from "@/store/articleSlice";
import { Input } from "@/components/ui/input";

const EditorTitle = () => {
  const { activeArticle } = useSelector((state: RootState) => state.article);
  const dispatch = useDispatch();

  return (
    <div className="title mb-6 flex gap-2">
      <div className="emoji">
        <Popover>
          <PopoverTrigger asChild>
            <span className="text-4xl cursor-pointer">
              {activeArticle.emoji}
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-70 p-1 h-50 overflow-auto flex flex-wrap gap-1.5">
            {emojiList.map((item) => {
              return (
                <span className="text-2xl cursor-pointer" key={item.emoji}>
                  {item.emoji}
                </span>
              );
            })}
          </PopoverContent>
        </Popover>
      </div>
      <Input
        type="text"
        className="title-input outline-0 border-0 text-4xl font-bold p-0"
        placeholder="请输入标题 . . ."
        value={activeArticle.title}
        onChange={(e) =>
          dispatch(
            updateActiveArticle({ id: activeArticle.id, title: e.target.value })
          )
        }
        style={{ border: 'none !important', outline: 'none !important', boxShadow: 'none', fontSize: '2rem', background: 'transparent' }}
      ></Input>
    </div>
  );
};

export default EditorTitle;
