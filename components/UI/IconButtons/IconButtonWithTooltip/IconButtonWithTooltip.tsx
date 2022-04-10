import React from 'react';
import cn from 'classnames';
import ReactTooltip, { Type, Effect, Place } from 'react-tooltip';
import { v4 as uuid } from 'uuid';

import { IconButton, IIconButton } from '..';

export interface ITooltip {
  className?: string;
  place: Place;
  effect: Effect;
  type: Type;
  content: string;
}

export interface IIconButtonWithTooltip extends IIconButton {
  tooltip: ITooltip;
  tooltipSpanStyle?: React.CSSProperties;
  tooltipSpanClassName?: string;
}

export const IconButtonWithTooltip: React.FC<IIconButtonWithTooltip> = (props) => {
  const {
    tooltip,
    tooltipSpanStyle,
    tooltipSpanClassName: propTooltipSpanClassName,
    style,
    className,
    children,
    ...rest
  } = props;
  const { className: tClassName, place, effect, type, content } = tooltip;
  const tooltipId = uuid();

  const tooltipSpanClassName = cn('uk-tooltip-span', {
    [propTooltipSpanClassName]: !!propTooltipSpanClassName,
  });

  return (
    <>
      <IconButton style={style} className={className} {...rest} data-tip data-for={tooltipId}>
        {children}
      </IconButton>
      <ReactTooltip id={tooltipId} className={tClassName} place={place} effect={effect} type={type}>
        <span className={tooltipSpanClassName} style={tooltipSpanStyle}>
          {content}
        </span>
      </ReactTooltip>
    </>
  );
};
