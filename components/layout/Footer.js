export default function Footer() {
    return (
        <footer className='mt-20 text-right text-[#b3b3b3] '>
            <section className='flex flex-col items-end'>
                <div>
                    <a
                        href='https://creativecommons.org/licenses/by-nc-sa/4.0/'
                        rel='noreferrer'
                        target='_blank'
                    >
                        CC BY-NC-SA 4.0
                    </a>{' '}
                    {new Date().getFullYear()}
                    <a
                        href='https://github.com/'
                        target='_blank'
                        className='pl-1'
                        rel='noreferrer'
                    >
                        © Peng
                    </a>
                </div>
            </section>
        </footer>
    );
}