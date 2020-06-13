// console.log(F_Type);
// $.post('http://47.103.41.41:8086/api/Video/IfDuplicate', {
//     F_Action: "Add",
//     F_Id: "",
//     F_Type: F_Type,
//     F_FileName: videoList[i],
// }, function (data) {
//     console.log(data);
//     if (data.data.status == 1) {
//         alert('该文件已存在');
//         return i = videoList.length;
//     }
// });

// function insertvideo(F_Order,F_Type,videoIds) {
//     //$.post('http://47.103.41.41:8086/api/Video/InsertVideoInfo',{"F_Order": F_Order, "F_Type": "my", "F_AliVideoId": videoIds } , function (data) {
//         //console.log(data);
//    // }, 'json')
//     $.ajax({
//         url: 'http://47.103.41.41:8086/api/Video/InsertVideoInfo',
//         datatype: "json",
//         type: 'post',
//         async:true,
//         data: {"F_Order": F_Order, "F_Type": "my", "F_AliVideoId": videoIds},
//         success: function (e) {   //成功后回调
//             console.log(e);
//         },
//         error: function (e) {    //失败后回调
//             // alert(e);
//         },
//         beforeSend: function () {
//             // /发送请求前调用，可以放一些"正在加载"之类额话
//             // alert("正在加载");
//         }
//     })
// }
// timeout: $('#timeout').val() || 60000,
// partSize: $('#partSize').val() || 1048576,
// parallel: $('#parallel').val() || 5,
// retryCount: $('#retryCount').val() || 3,
// retryDuration: $('#retryDuration').val() || 2,
// region: $('#region').val(),
// userId: $('#userId').val(),
