export default ({ date }) => date instanceof Date && <time dateTime={ date.toISOString() }>{ date.toLocaleString().replace(/:00$/, '') }</time>;
