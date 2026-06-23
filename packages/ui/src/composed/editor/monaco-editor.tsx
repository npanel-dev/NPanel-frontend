"use client";

import { Editor, type Monaco, type OnMount } from "@monaco-editor/react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { EyeIcon, EyeOff, FullscreenIcon, MinimizeIcon } from "lucide-react";
import type { editor } from "monaco-editor";
import DraculaTheme from "monaco-themes/themes/Dracula.json" with {
  type: "json",
};
import { useEffect, useRef, useState } from "react";

export interface MonacoEditorProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  onBlur?: (value: string | undefined) => void;
  title?: string;
  description?: string;
  placeholder?: string;
  render?: (value?: string) => React.ReactNode;
  onMount?: OnMount;
  beforeMount?: (monaco: Monaco) => void;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
  readOnly?: boolean;
  wordWrap?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function MonacoEditor({
  value: propValue,
  onChange,
  onBlur,
  title = "Editor Title",
  description,
  placeholder = "Start typing...",
  render,
  onMount,
  beforeMount,
  language = "markdown",
  className,
  showLineNumbers = false,
  readOnly = false,
  wordWrap = false,
}: MonacoEditorProps) {
  const [internalValue, setInternalValue] = useState<string | undefined>(
    propValue
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const isSyncingScrollRef = useRef(false);

  useEffect(() => {
    if (propValue !== internalValue) {
      setInternalValue(propValue);
    }
  }, [propValue]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      editorRef.current?.layout();
    });
    return () => cancelAnimationFrame(frame);
  }, [isPreviewVisible, isFullscreen]);

  useEffect(() => {
    const editor = editorRef.current;
    const preview = previewRef.current;
    if (!editor || !preview || !isPreviewVisible || !render) return;

    const syncPreviewToEditor = () => {
      const maxEditorScroll =
        editor.getScrollHeight() - editor.getLayoutInfo().height;
      const ratio =
        maxEditorScroll > 0 ? editor.getScrollTop() / maxEditorScroll : 0;
      const maxPreviewScroll = preview.scrollHeight - preview.clientHeight;
      preview.scrollTop = ratio * maxPreviewScroll;
    };

    const syncEditorToPreview = () => {
      const maxPreviewScroll = preview.scrollHeight - preview.clientHeight;
      const ratio =
        maxPreviewScroll > 0 ? preview.scrollTop / maxPreviewScroll : 0;
      const maxEditorScroll =
        editor.getScrollHeight() - editor.getLayoutInfo().height;
      editor.setScrollTop(ratio * maxEditorScroll);
    };

    syncPreviewToEditor();

    const editorScrollDisposable = editor.onDidScrollChange(() => {
      if (isSyncingScrollRef.current) return;
      isSyncingScrollRef.current = true;
      syncPreviewToEditor();
      requestAnimationFrame(() => {
        isSyncingScrollRef.current = false;
      });
    });

    const onPreviewScroll = () => {
      if (isSyncingScrollRef.current) return;
      isSyncingScrollRef.current = true;
      syncEditorToPreview();
      requestAnimationFrame(() => {
        isSyncingScrollRef.current = false;
      });
    };

    preview.addEventListener("scroll", onPreviewScroll, { passive: true });

    return () => {
      editorScrollDisposable.dispose();
      preview.removeEventListener("scroll", onPreviewScroll);
    };
  }, [isPreviewVisible, render]);

  const debouncedOnChange = useRef(
    debounce((newValue: string | undefined) => {
      if (onChange) {
        onChange(newValue);
      }
    }, 300)
  ).current;

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    if (onMount) onMount(editor, monaco);

    editor.onDidChangeModelContent(() => {
      const newValue = editor.getValue();
      setInternalValue(newValue);
      debouncedOnChange(newValue);
    });

    editor.onDidBlurEditorWidget(() => {
      if (onBlur) {
        onBlur(editor.getValue());
      }
    });
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const togglePreview = () => setIsPreviewVisible(!isPreviewVisible);

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex w-full flex-col rounded-md border",
          isFullscreen
            ? "!mt-0 fixed inset-0 z-50 h-screen bg-background"
            : "h-96",
          className
        )}
      >
        <div className="flex items-center justify-between border-b p-2">
          <div>
            <h1 className="text-left font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {title}
            </h1>
            <p className="text-[0.8rem] text-muted-foreground">{description}</p>
          </div>

          <div className="flex items-center space-x-2">
            {render && (
              <Button
                onClick={togglePreview}
                size="icon"
                type="button"
                variant="outline"
              >
                {isPreviewVisible ? <EyeOff /> : <EyeIcon />}
              </Button>
            )}
            <Button
              onClick={toggleFullscreen}
              size="icon"
              type="button"
              variant="outline"
            >
              {isFullscreen ? <MinimizeIcon /> : <FullscreenIcon />}
            </Button>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1">
          <div
            className="relative min-h-0 min-w-0 flex-1 overflow-hidden p-4 invert dark:invert-0"
            onWheel={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full">
              <div className="absolute inset-0 overscroll-contain">
                <Editor
                  beforeMount={(monaco: Monaco) => {
                    monaco.editor.defineTheme("transparentTheme", {
                      base: DraculaTheme.base as "vs" | "vs-dark" | "hc-black",
                      inherit: DraculaTheme.inherit,
                      rules: DraculaTheme.rules,
                      colors: {
                        ...DraculaTheme.colors,
                        "editor.background": "#00000000",
                      },
                    });
                    if (beforeMount) {
                      beforeMount(monaco);
                    }
                  }}
                  height="100%"
                  language={language}
                  onChange={(newValue) => {
                    setInternalValue(newValue);
                    debouncedOnChange(newValue);
                  }}
                  onMount={handleEditorDidMount}
                  options={{
                    automaticLayout: true,
                    contextmenu: false,
                    folding: false,
                    fontSize: 14,
                    formatOnPaste: true,
                    formatOnType: true,
                    glyphMargin: false,
                    lineNumbers: showLineNumbers ? "on" : "off",
                    minimap: { enabled: false },
                    overviewRulerLanes: 0,
                    renderLineHighlight: "none",
                    scrollBeyondLastLine: false,
                    scrollbar: {
                      horizontal: wordWrap ? "hidden" : "auto",
                      useShadows: false,
                      vertical: "auto",
                    },
                    tabSize: 2,
                    wordWrap: wordWrap ? "on" : "off",
                    readOnly,
                  }}
                  theme="transparentTheme"
                  value={internalValue}
                />
              </div>
              {!internalValue?.trim() && placeholder && (
                <pre
                  className={cn(
                    "pointer-events-none absolute top-0 left-3 text-muted-foreground text-sm",
                    {
                      "left-12": showLineNumbers,
                    }
                  )}
                  style={{ userSelect: "none" }}
                >
                  {placeholder}
                </pre>
              )}
            </div>
          </div>
          {render && isPreviewVisible && (
            <div
              className="min-h-0 min-w-0 flex-1 overflow-auto border-l p-4"
              onWheel={(e) => e.stopPropagation()}
              ref={previewRef}
            >
              {render(internalValue)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
