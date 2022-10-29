import { ReactNode } from 'react';
import clsx from 'clsx';

import './index.scss';

interface Props {
  className?: string;
  children: ReactNode;
  text: string;
}

const Tooltip = ({ className, children, text }: Props) => {
  return (
    <div className={clsx('tooltip', className)} data-text={text}>
      {children}
    </div>
  );
};

export default Tooltip;
