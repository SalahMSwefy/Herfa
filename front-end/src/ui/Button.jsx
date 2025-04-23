function Button({ children, type }) {
    const styles = {
        submit: 'bg-stone-200 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded',
    }

    return <button className={styles[type]}>{children}</button>
}

export default Button
