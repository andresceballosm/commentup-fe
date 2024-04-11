import PositionDetail from '@/components/ui/PositionDetail';
import TablePositions from '@/components/ui/TablePosition';
import TablePostulations from '@/components/ui/TablePostulations';

export const getComponentQuery = (values: any) => {
  switch (values.component) {
    case 'TablePositions':
      return <TablePositions />;
    case 'PositionDetail':
      return <PositionDetail />;
    case 'TablePostulations':
      return <TablePostulations />;
    default:
      return null;
  }
};
