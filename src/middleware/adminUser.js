
const adminUser = (ctx, next) => {
    if (ctx.session.admin) { return next() }
    ctx.response.json({ error : -1, descripcion: 'Sólo administradores' })
}

export default adminUser