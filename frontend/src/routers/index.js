import SMERouter from "sme-router";
import { index, login, register } from "../controllers";
const router = new SMERouter("app");

router.use((req)=>{ //路由守卫
    $.ajax({
        url: "/api/users/rulevis",
        type: "get",
        success: (res) => {
            if(res.status == 0){
                router.go("/index");
            }else{
                router.go("/login");
            }
        },
        error:(erer=>{
            router.go("/login");
        })
    });
})

router.route("/", index(router));
router.route("/index", index(router));
router.route("/login", login(router));
router.route("/register", register(router));


// $.ajax({
//     url: "/api/users/rulevis",
//     type: "get",
//     success: (res) => {
//         if(res.status == 0){
//             router.go("/index");
//         }else{
//             router.go("/login");
//         }
//     },
//     error:(erer=>{
//         router.go("/login");
//     })
// });



//默认跳转

