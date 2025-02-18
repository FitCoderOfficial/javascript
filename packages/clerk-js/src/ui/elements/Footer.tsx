import type { FooterActionId } from '@clerk/types';
import React from 'react';

import { descriptors, Flex, Link, localizationKeys, Text, useAppearance } from '../customizables';
import type { PropsOfComponent } from '../styledSystem';
import { mqu } from '../styledSystem';
import { RouterLink } from './RouterLink';

const FooterRoot = (props: React.PropsWithChildren<any>): JSX.Element => {
  return (
    <Flex
      elementDescriptor={descriptors.footer}
      {...props}
      justify='between'
      align='center'
      sx={{
        '&:empty': {
          // Remove the element from the DOM if `Footer.Links` is the only child and is `null`,
          // causing this element to be empty, creating an unwanted spacing
          display: 'none',
        },
      }}
    />
  );
};

type FooterActionProps = Omit<PropsOfComponent<typeof Flex>, 'elementId'> & {
  elementId?: FooterActionId;
};
const FooterAction = (props: FooterActionProps): JSX.Element => {
  const { elementId, ...rest } = props;
  return (
    <Flex
      elementDescriptor={descriptors.footerAction}
      elementId={descriptors.footerAction.setId(elementId)}
      {...rest}
      gap={1}
      sx={t => ({
        margin: `${t.space.$none} auto`,
      })}
    />
  );
};

const FooterActionText = (props: React.PropsWithChildren<any>): JSX.Element => {
  return (
    <Text
      elementDescriptor={descriptors.footerActionText}
      {...props}
      as='span'
      variant='body'
      colorScheme='neutral'
    />
  );
};

const FooterActionLink = (props: PropsOfComponent<typeof RouterLink>): JSX.Element => {
  return (
    <RouterLink
      elementDescriptor={descriptors.footerActionLink}
      {...props}
      // colorScheme='primary'
      sx={t => ({
        // TODO: Make the color theme-aware once we have dark mode colors
        color: t.colors.$primary700,
        fontWeight: t.fontWeights.$medium,
      })}
    />
  );
};

const FooterLink = (props: PropsOfComponent<typeof Link>): JSX.Element => {
  return (
    <Link
      elementDescriptor={descriptors.footerPagesLink}
      {...props}
      colorScheme='neutral'
    />
  );
};

const FooterLinks = React.memo((): JSX.Element | null => {
  const { helpPageUrl, privacyPageUrl, termsPageUrl } = useAppearance().parsedLayout;

  if (!helpPageUrl && !privacyPageUrl && !termsPageUrl) return null;

  return (
    <Flex
      elementDescriptor={descriptors.footerPages}
      justify='between'
      sx={t => ({
        gap: t.space.$3,
        [mqu.xs]: {
          gap: t.space.$2,
        },
      })}
    >
      {helpPageUrl && (
        <FooterLink
          localizationKey={localizationKeys('footerPageLink__help')}
          elementId={descriptors.footerPagesLink.setId('help')}
          isExternal
          href={helpPageUrl}
        />
      )}
      {privacyPageUrl && (
        <FooterLink
          localizationKey={localizationKeys('footerPageLink__privacy')}
          elementId={descriptors.footerPagesLink.setId('privacy')}
          isExternal
          href={privacyPageUrl}
        />
      )}
      {termsPageUrl && (
        <FooterLink
          localizationKey={localizationKeys('footerPageLink__terms')}
          elementId={descriptors.footerPagesLink.setId('terms')}
          isExternal
          href={termsPageUrl}
        />
      )}
    </Flex>
  );
});

export const Footer = {
  Root: FooterRoot,
  Action: FooterAction,
  ActionLink: FooterActionLink,
  ActionText: FooterActionText,
  Links: FooterLinks,
  Link: FooterLink,
};
