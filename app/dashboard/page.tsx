import KanbanBoard from '@/components/KanbanBoard';

export default function DashboardPage() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">실무 어드민 대시보드</h1>
      <KanbanBoard />
    </main>
  );
}
