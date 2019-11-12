const Koa = require("koa")
const bodyparser = require("koa-bodyparser")
const static = require("koa-static")
const query = require("./db/query")
const router = require("koa-router")()
const path = require("path")

let app = new Koa()
app.use(bodyparser())

app.use(router.routes())
app.use(router.allowedMethods())

app.use(static(path.join(process.cwd(), "public")))


//添加一条信息
router.post("/api/add", async ctx => {
    let { sort, desc, connect } = ctx.request.body;
    if (sort && desc) {
        let user = await query('select * from manangeList where sort=?', [sort]);
        if (user.length) {
            ctx.body = {
                code: 0,
                msg: '此列表已存在'
            }
            console.log(1);

        } else {
            try {
                let createTime = new Date();
                await query('insert into manangeList (sort,descs,connect,createTime) values (?,?,?,?)', [sort, desc, connect, createTime])
                console.log(111);
                ctx.body = {
                    code: 1,
                    msg: '添加成功'
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    msg: e
                }
            }
        }
    } else {
        ctx.body = {
            code: 0,
            msg: "参数缺失"
        }
    }
})

//删除一个列表
router.get("/api/remove", async(ctx, next) => {
    let { id } = ctx.query;

    if (id || id === 0) {
        try {
            await query("delete from manangeList where id=?", [id])
            ctx.body = {
                code: 1,
                msg: "删除成功"
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e.err
            }
        }
    } else {
        ctx.body = {
            code: 0,
            msg: '你需要传递一个id'
        }
    }
})

//修改一个列表
router.post("/api/edit", async(ctx, next) => {
    let { sort, desc, connect, id } = ctx.request.body;

    if (id && user && pwd) {
        try {
            let createTime = new Date();
            await query("update userlist set sort=?,descs=?,connect=?,createTime=? where id=? ", [sort, desc, connect, createTime, id])
            ctx.body = {
                code: 1,
                msg: "修改成功"
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e.err
            }
        }
    } else {
        ctx.body = {
            code: 0,
            msg: '此用户不存在'
        }
    }
})


app.listen(3000)