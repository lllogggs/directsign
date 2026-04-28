import ContractReviewViewer from '@/components/ContractReviewViewer';

export default function ContractReviewPage({ params }: { params: { id: string } }) {
  return <ContractReviewViewer contractId={params.id} />;
}
