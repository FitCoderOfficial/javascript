import type { PropsOfComponent, StyleVariants } from '../styledSystem';
import { common, createCssVariables, createVariants } from '../styledSystem';
import { Flex } from './Flex';

const vars = createCssVariables('accent', 'bg');

const { applyVariants, filterProps } = createVariants(theme => ({
  base: {
    color: vars.accent,
    background: vars.bg,
    borderRadius: theme.radii.$lg,
    height: theme.space.$4,
    minWidth: theme.space.$5,
    padding: `${theme.space.$0x5} ${theme.space.$1}`,
    display: 'inline-flex',
  },
  variants: {
    textVariant: { ...common.textVariants(theme) },
    colorScheme: {
      primary: {
        [vars.accent]: theme.colors.$colorTextOnPrimaryBackground,
        [vars.bg]: `linear-gradient(180deg, ${theme.colors.$whiteAlpha300} 0%, ${theme.colors.$transparent} 100%), ${theme.colors.$primary500}`,
      },
    },
  },
  defaultVariants: {
    colorScheme: 'primary',
    textVariant: 'caption',
  },
}));

// @ts-ignore
export type NotificationBadgeProps = PropsOfComponent<typeof Flex> & StyleVariants<typeof applyVariants>;

export const NotificationBadge = (props: NotificationBadgeProps) => {
  return (
    <Flex
      {...filterProps(props)}
      center
      as='span'
      css={[
        applyVariants(props) as any,
        {
          lineHeight: 0,
        },
      ]}
    />
  );
};
