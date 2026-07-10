"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { buildWhatsAppClickPayload, getSourceAwareWhatsAppUrl, trackWhatsAppClick } from "@/lib/tracking";

type TrackedWhatsAppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  href: string;
  placement: string;
  label?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function TrackedWhatsAppLink({
  href,
  placement,
  label,
  children,
  target = "_blank",
  rel = "noopener noreferrer",
  onClick,
  ...props
}: TrackedWhatsAppLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const finalHref = getSourceAwareWhatsAppUrl(href);
    event.currentTarget.href = finalHref;

    const payload = buildWhatsAppClickPayload({
      placement,
      label: label || getText(children) || "WhatsApp",
      whatsappUrl: finalHref
    });

    trackWhatsAppClick(payload);
    onClick?.(event);

    if (event.defaultPrevented) return;

    event.preventDefault();
    if (target === "_self") {
      window.location.href = finalHref;
      return;
    }

    window.open(finalHref, target, rel ? "noopener,noreferrer" : undefined);
  }

  return (
    <a href={href} target={target} rel={rel} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

function getText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getText).join(" ").trim();
  return "";
}
