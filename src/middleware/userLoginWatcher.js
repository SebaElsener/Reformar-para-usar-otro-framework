
const userLoginWatcher = async (ctx, next) => {
    console.log(ctx.isAuthenticated())
    if (!ctx.isAuthenticated()) { await ctx.render('timeout') }
    await next()
}

export default userLoginWatcher