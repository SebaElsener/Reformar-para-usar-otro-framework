
const userLoginWatcher = async (ctx, next) => {
    console.log(ctx.isAuthenticated())
    ctx.isAuthenticated() ? await next() : await ctx.render('timeout')
}

export default userLoginWatcher