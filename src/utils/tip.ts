export const tLog = (data: Resp<any>, success: () => void) => {
    if (data.code === 200) {
        alert("操作成功")
        success()
    } else {
        alert("操作失败")
    }
}
