import Link from "next/link";

function SimpleLink({children, href, openNewTab, className, nextLinkProps, ...rest}) {
    const isNewTab = openNewTab != null ? openNewTab : href && !href.startsWith('/') && !href.startsWith('#')

    if (!isNewTab) {
        return (
            <Link href={href} {...nextLinkProps} className={className} {...rest}>
                {children}
            </Link>
        )
    }
    return (
        <a target='_blank' rel='noopener noreferrer' href={href} {...rest}
           className='cursor-pointer'>{children}</a>
    )
}

export default SimpleLink