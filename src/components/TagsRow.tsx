interface TagsRowProps {
  tags: string[];
  maxVisible?: number;
}

export default function TagsRow({ tags, maxVisible = 2 }: TagsRowProps) {
  const visible = tags.slice(0, maxVisible);
  const hidden = tags.slice(maxVisible);

  return (
    <div className="relative flex items-center gap-2">
      {visible.map((tag) => (
        <span
          key={tag}
          className="
            inline-flex items-center
            h-7 px-3
            text-xs font-medium
            leading-none
            rounded-md
            bg-slate-800/70
            text-slate-300
            border border-slate-700/60
            whitespace-nowrap
          "
        >
          {tag}
        </span>
      ))}

      {hidden.length > 0 && (
        <div className="relative group">
          {/* +N pill */}
          <span
            className="
              inline-flex items-center
              h-7 px-3
              text-xs font-medium
              leading-none
              rounded-md
              bg-slate-800/70
              text-slate-400
              border border-slate-700/60
              cursor-default
            "
          >
            +{hidden.length}
          </span>

          {/* Hover popup */}
          <div
            className="
              absolute z-30
              top-full left-0 mt-2
              hidden group-hover:flex
              flex-wrap gap-2
              p-3
              rounded-lg
              bg-slate-900/95
              border border-slate-700/60
              shadow-xl
              backdrop-blur
              min-w-max
            "
          >
            {hidden.map((tag) => (
              <span
                key={tag}
                className="
                  inline-flex items-center
                  h-7 px-3
                  text-xs font-medium
                  leading-none
                  rounded-md
                  bg-slate-800/70
                  text-slate-300
                  border border-slate-700/60
                  whitespace-nowrap
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
