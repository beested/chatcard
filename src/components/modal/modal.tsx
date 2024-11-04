import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import {
  Activity,
  Blocks,
  CircleCheck,
  Hourglass,
  SquarePlus,
} from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputForm } from '../form/form-input';
import { SelectForm } from '../form/form-select';
import { TextareaForm } from '../form/form-textarea';
import { Button } from '../ui/button';

interface FeedbackDialogProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

interface TasksFormProps {
  content: string;
  title: string;
  number: string;
  columnId: string;
}

export function AddTaskDialog({ isOpen, setOpen }: FeedbackDialogProps) {
  const form = useForm<TasksFormProps>({
    defaultValues: {
      content: '',
      title: '',
    },
  });

  const submitForm: SubmitHandler<TasksFormProps> = async (values) => {
    const updatedValues = {
      ...values,
      id: Math.random().toString(36).substring(2, 9),
      type: 'other',
      number: '',
    };

    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = [...existingTasks, updatedValues];

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    setOpen(false); // Fechar o modal ou o formulário

    // Adicione um timeout para garantir que as alterações sejam aplicadas antes de atualizar a página
    setTimeout(() => {
      window.location.reload(); // Força um refresh na página
    }, 100); // O delay de 100ms pode ser ajustado conforme necessário
  };
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        variant="success"
        icon={<Blocks size={24} />}
        className="max-w-[25rem]"
      >
        <DialogHeader>
          <DialogTitle className="text-center">
            Adicione sua nova Anotação!
          </DialogTitle>
        </DialogHeader>

        <DialogDescription />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitForm)}
            className="space-y-2 w-full"
          >
            <SelectForm
              control={form.control}
              label="Local"
              name="columnId"
              options={[
                {
                  label: 'Aguardando',
                  value: 'todo',
                  icon: <Hourglass color="#fbbf24" size={18} />,
                },
                {
                  label: 'Em progresso',
                  value: 'in-progress',
                  icon: <Activity color="#ea580c" size={18} />,
                },
                {
                  label: 'Concluído',
                  value: 'done',
                  icon: <CircleCheck color="green" size={18} />,
                },
              ]}
            />
            <InputForm
              control={form.control}
              label="Título da Anotação"
              name="title"
            />
            <TextareaForm
              name="content"
              label="Informações adicionais da sua Anotação"
              control={form.control}
            />
            <Button variant="outline" className="w-full" type="submit">
              <SquarePlus size={18} />
              Adicionar Anotação ao quadro
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
