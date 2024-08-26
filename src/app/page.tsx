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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Context } from '@/context/Gemini';
import { Gamepad2Icon, Medal, Printer, Search, Ship } from 'lucide-react';
import { useContext } from 'react';

import { useState } from 'react';

export default function Home() {
  const {
    input,
    setInput,
    recentPrompt,
    prevPrompts,
    showResult,
    loading,
    resultData,
    onSent,
    setShowResult,
  } = useContext(Context);

  const [activeTab, setActiveTab] = useState<string>('init');

  const handleSend = async (prompt: string) => {
    setActiveTab(prompt);
    await onSent(prompt);
  };

  const cardData = [
    { icon: Ship, description: 'Como foi o descobrimento do Brasil?' },
    { icon: Gamepad2Icon, description: 'Qual foi o principal jogo da Steam?' },
    {
      icon: Printer,
      description: 'Monte um relatório com informações básicas do IBGE.',
    },
    {
      icon: Medal,
      description: 'Qual é o maior time do Rio Grande do Sul?',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex justify-between pb-4 w-[1016px] ">
        <ThemeColorToggle />
        <ThemeModeToggle />
      </div>
      <div className="flex space-x-4">
        <Card className="w-[300px] h-[800px] grid grid-rows-[min-content_1fr_min-content]">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full h-[800px]"
          >
            <TabsList className="flex flex-col w-full h-full overflow-y-auto">
              <TabsTrigger
                value="init"
                className="overflow-hidden text-ellipsis whitespace-nowrap"
                onClick={() => {
                  setShowResult(false);
                }}
              >
                <span className="block truncate">Novas Questões?</span>
              </TabsTrigger>
              {prevPrompts.map((prompt, index) => (
                <TabsTrigger
                  value={prompt}
                  key={index}
                  onClick={() => handleSend(prompt)}
                  className="overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  <p className="block truncate overflow-hidden text-ellipsis whitespace-nowrap w-60">
                    {prompt}
                  </p>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </Card>
        <Card className="w-[700px] h-[800px] grid grid-rows-[min-content_1fr_min-content] overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          <CardHeader>
            <CardTitle className="text-primary">QuestionsAI</CardTitle>
            <CardDescription className="text-sm">
              Sou a QuestionsAI, projetada para resolver problemas, encontrar
              soluções e entregar resultados.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <div className="items-center space-x-4 grid grid-rows-[min-content_1fr_min-content]">
                <Skeleton className="h-12 w-12 rounded-full bg-primary/50 text-primary mx-3" />
                <div className="space-y-2 mt-2">
                  <Skeleton className="h-4 w-full bg-primary/50 text-primary" />
                  <Skeleton className="h-4 w-10/12 bg-primary/50 text-primary" />
                  <Skeleton className="h-4 w-11/12 bg-primary/50 text-primary" />
                </div>
              </div>
            ) : !showResult ? (
              <div className="grid grid-cols-2 gap-4">
                {cardData.map(({ icon: Icon, description }, index) => (
                  <Card
                    key={index}
                    className="w-full h-full transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
                    onClick={() => handleSend(description)}
                  >
                    <CardHeader>
                      <Icon className="text-primary align-middle w-full" />
                      <CardDescription className="text-sm">
                        {description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div className="flex gap-3 text-slate-600 text-sm">
                  <Avatar>
                    <AvatarFallback>BR</AvatarFallback>
                    <AvatarImage src="https://github.com/beested.png" />
                  </Avatar>

                  <p className="leading-relaxed">
                    <span className="block font-bold text-slate-700 dark:text-slate-400 ">
                      Beested:
                    </span>
                    <p className="dark:text-slate-400"> {recentPrompt}</p>
                  </p>
                </div>
                <div className="flex gap-3 text-slate-600 text-sm">
                  <Avatar>
                    <AvatarFallback>BR</AvatarFallback>
                    <AvatarImage src="https://scalebranding.com/wp-content/uploads/2022/02/Cute-Robot-Diver-Logo-1024x1024.png" />
                  </Avatar>

                  <p className="leading-normal">
                    <span className="block font-bold text-slate-700 dark:text-slate-400 ">
                      QuestionsAI:
                    </span>
                    <p
                      dangerouslySetInnerHTML={{ __html: resultData }}
                      className="dark:text-slate-400"
                    />
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
            <Button type="submit" onClick={() => handleSend(input)}>
              <Search size={18} />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
