'use client';
import { ThemeColorToggle } from '@/components/themeToggle/theme-color-toggle';
import { ThemeModeToggle } from '@/components/themeToggle/theme-mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Context } from '@/context/Gemini';
import { Search } from 'lucide-react';
import { useContext } from 'react';

export default function Home() {
  const {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSent,
  } = useContext(Context);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex justify-between pb-4 w-[400px] ">
        <ThemeColorToggle />
        <ThemeModeToggle />
      </div>
      <Card className="w-[400px] h-[700px] grid grid-rows-[min-content_1fr_min-content]">
        <CardHeader>
          <CardTitle className="text-primary">BeesteD</CardTitle>
          <CardDescription className="text-sm">
            Sou a BeesteD, projetada para resolver problemas, encontrar soluções
            e entregar resultados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-primary/50 text-primary" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-primary/50 text-primary" />
                <Skeleton className="h-4 w-[200px] bg-primary/50 text-primary" />
              </div>
            </div>
          ) : !showResult ? (
            <p></p>
          ) : (
            <>
              <div className="flex gap-3 text-slate-600 text-sm">
                <Avatar>
                  <AvatarFallback>BR</AvatarFallback>
                  <AvatarImage src="https://github.com/beested.png" />
                </Avatar>

                <p className="leading-relaxed">
                  <span className="block font-bold text-slate-700">
                    Beested:
                  </span>
                  {recentPrompt}
                </p>
              </div>
              <div className="flex gap-3 text-slate-600 text-sm">
                <Avatar>
                  <AvatarFallback>BR</AvatarFallback>
                  <AvatarImage src="https://github.com/hawkecoding.png" />
                </Avatar>

                <p className="leading-normal">
                  <span className="block font-bold text-slate-700">
                    HawkeCoding:
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: resultData }} />
                </p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="space-x-2">
          <Input
            placeholder="Como posso ajudar ?"
            onChange={(e: any) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <Button type="submit" onClick={() => onSent(input)}>
            <Search size={18} />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
