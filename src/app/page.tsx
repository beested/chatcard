'use client';
import { KanbanBoard } from '@/components/KanbanBoard';
import { AddTaskDialog } from '@/components/modal/modal';
import { ThemeColorToggle } from '@/components/themeToggle/theme-color-toggle';
import { ThemeModeToggle } from '@/components/themeToggle/theme-mode-toggle';
import { Button } from '@/components/ui/button';
import { Blocks } from 'lucide-react';
import { useState } from 'react';
export default function Home() {
  const [openAddDialog, setOpenAddDialog] = useState(false);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 md:p-8">
      <div className="flex justify-between pb-4 w-full px-52">
        <div className="flex space-x-4">
          <ThemeColorToggle />
          <ThemeModeToggle />
        </div>

        <Button variant="outline" onClick={() => setOpenAddDialog(true)}>
          <Blocks className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          Adicionar
        </Button>
      </div>

      <div className="flex w-full justify-center max-w-8xl">
        <KanbanBoard />
        <AddTaskDialog isOpen={openAddDialog} setOpen={setOpenAddDialog} />
      </div>
    </div>
  );
}
