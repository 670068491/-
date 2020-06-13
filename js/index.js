//兼容IE11
if (!FileReader.prototype.readAsBinaryString) {
    FileReader.prototype.readAsBinaryString = function (fileData) {
        var binary = "";
        var pt = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            //pt.result  - readonly so assign binary
            pt.content = binary;
            pt.onload()
        }
        reader.readAsArrayBuffer(fileData);
    }
}
$(document).ready(function () {
    var oNum = 1;
    var videoIds;
    var uploader = null;

    $(".upImage").click(function () {
        // location.href = "www.baidu.com";
        window.open("./image.html");
    })
    $(".upVideo").click(function () {
        // console.log('1');
        $(".main").css("display", "none");
        $(".contain").css("display", "block");
        $.getJSON("http://47.103.41.41:8086/api/Video/GetVideoInfoList", {
            F_Type: "joint",
            "pagination.rows": 5,
            "pagination.page": 1
        }, function (data) {
            // console.log(data);
            for (var i = 0; i < data.data.rows.length; i++) {
                var htmlStr = ``;
                var Hour = ((data.data.rows[i].F_Hour + '').length < 2) ? "0" + data.data.rows[i].F_Hour : data.data.rows[i].F_Hour;
                var Minute = ((data.data.rows[i].F_Minute + '').length < 2) ? "0" + data.data.rows[i].F_Minute : data.data.rows[i].F_Minute;
                var Second = ((data.data.rows[i].F_Second + '').length < 2) ? "0" + data.data.rows[i].F_Second : data.data.rows[i].F_Second;
                htmlStr += `<tr id="${data.data.rows[i].F_Id}">
                <td class="table_span" style=" line-height:2.6;">${oNum++}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_RealName}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_FileName}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Order}</td>
                <td style=" line-height: 2.6;">${Hour + ':' + Minute + ':' + Second}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Type}</td>
                <td></td>
                <td>
                    <button class="btn btn-default" type="button">编辑</button>
                    <button class="btn btn-danger" type="button">删除</button>
                </td>
            </tr>`
                $(".table_tbody").append(htmlStr);
            }
        });

        setTimeout(function () {
            $.getJSON("http://47.103.41.41:8086/api/Video/GetVideoInfoList", {
                F_Type: "class",
                "pagination.rows": 5,
                "pagination.page": 1
            }, function (data) {
                // console.log(data);
                for (var i = 0; i < data.data.rows.length; i++) {
                    var htmlStr = ``;
                    var Hour = ((data.data.rows[i].F_Hour + '').length < 2) ? "0" + data.data.rows[i].F_Hour : data.data.rows[i].F_Hour;
                    var Minute = ((data.data.rows[i].F_Minute + '').length < 2) ? "0" + data.data.rows[i].F_Minute : data.data.rows[i].F_Minute;
                    var Second = ((data.data.rows[i].F_Second + '').length < 2) ? "0" + data.data.rows[i].F_Second : data.data.rows[i].F_Second;
                    htmlStr += `<tr id="${data.data.rows[i].F_Id}">
                <td class="table_span" style=" line-height:2.6;">${oNum++}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_RealName}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_FileName}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Order}</td>
                <td style=" line-height: 2.6;">${Hour + ':' + Minute + ':' + Second}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Type}</td>
                <td></td>
                <td>
                    <button class="btn btn-default" type="button">编辑</button>
                    <button class="btn btn-danger" type="button">删除</button>
                </td>
            </tr>`
                    $(".table_tbody").append(htmlStr);
                }
            });
        }, 250);
        setTimeout(function () {
            $.getJSON("http://47.103.41.41:8086/api/Video/GetVideoInfoList", {
                F_Type: "my",
                "pagination.rows": 5,
                "pagination.page": 1
            }, function (data) {
                // console.log(data);
                for (var i = 0; i < data.data.rows.length; i++) {
                    var htmlStr = ``;
                    var Hour = ((data.data.rows[i].F_Hour + '').length < 2) ? "0" + data.data.rows[i].F_Hour : data.data.rows[i].F_Hour;
                    var Minute = ((data.data.rows[i].F_Minute + '').length < 2) ? "0" + data.data.rows[i].F_Minute : data.data.rows[i].F_Minute;
                    var Second = ((data.data.rows[i].F_Second + '').length < 2) ? "0" + data.data.rows[i].F_Second : data.data.rows[i].F_Second;
                    htmlStr += `<tr id="${data.data.rows[i].F_Id}">
                <td class="table_span" style=" line-height:2.6;">${oNum++}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_RealName}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_FileName}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Order}</td>
                <td style=" line-height: 2.6;">${Hour + ':' + Minute + ':' + Second}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Type}</td>
                <td></td>
                <td>
                    <button class="btn btn-default" type="button">编辑</button>
                    <button class="btn btn-danger" type="button">删除</button>
                </td>
            </tr>`
                    $(".table_tbody").append(htmlStr);
                }
            });
        }, 500);
        setTimeout(function () {
            $.getJSON("http://47.103.41.41:8086/api/Video/GetVideoInfoList", {
                F_Type: "heart",
                "pagination.rows": 5,
                "pagination.page": 1
            }, function (data) {
                // console.log(data);
                for (var i = 0; i < data.data.rows.length; i++) {
                    var htmlStr = ``;
                    var Hour = ((data.data.rows[i].F_Hour + '').length < 2) ? "0" + data.data.rows[i].F_Hour : data.data.rows[i].F_Hour;
                    var Minute = ((data.data.rows[i].F_Minute + '').length < 2) ? "0" + data.data.rows[i].F_Minute : data.data.rows[i].F_Minute;
                    var Second = ((data.data.rows[i].F_Second + '').length < 2) ? "0" + data.data.rows[i].F_Second : data.data.rows[i].F_Second;
                    htmlStr += `<tr id="${data.data.rows[i].F_Id}">
                <td class="table_span" style=" line-height:2.6;">${oNum++}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_RealName}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_FileName}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Order}</td>
                <td style=" line-height: 2.6;">${Hour + ':' + Minute + ':' + Second}</td>
                <td style=" line-height: 2.6;">${data.data.rows[i].F_Type}</td>
                <td></td>
                <td>
                    <button class="btn btn-default" type="button">编辑</button>
                    <button class="btn btn-danger" type="button">删除</button>
                </td>
            </tr>`
                    $(".table_tbody").append(htmlStr);
                }
            });
        }, 750);


    });
    var videoList = [];

    /*** 创建一个上传对象
     * 使用 STSToken 上传方式*/
    function createUploader() {
        var uploader = new AliyunUpload.Vod({
            timeout: 60000,
            partSize: 1048576,
            parallel: 5,
            retryCount: 3,
            retryDuration: 2,
            region: "cn-shanghai",
            userId: 1494058750874094,

            addFileSuccess: function (uploadInfo) {    // 添加文件成功
                $('#stsUpload').attr('disabled', false);
                // $('#resumeUpload').attr('disabled', false);
                $('#status').text('添加文件成功, 等待上传...');
                console.log("addFileSuccess: " + uploadInfo.file.name);
            },
            onUploadstarted: function (uploadInfo) {   // 开始上传
                // 如果是 STSToken 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
                // 用户需要自己获取 accessKeyId, accessKeySecret,secretToken
                // 下面的 URL 只是测试接口, 用于获取 测试的 accessKeyId, accessKeySecret,secretToken
                console.log(uploadInfo);
                var stsUrl = "http://47.103.41.41:8083/api/AliSts/StsNetSdk";
                $.getJSON(stsUrl, function (data) {
                    var info = JSON.parse(data);
                    var accessKeyId = info.AccessKeyId;
                    var accessKeySecret = info.AccessKeySecret;
                    var secretToken = info.SecurityToken;
                    uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken);
                });
                $('#status').text('文件开始上传...');
                console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
            },
            // 文件上传成功
            onUploadSucceed: function (uploadInfo) {
                console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
                $('#status').text('文件上传成功!');
                $('#F_Order').val('');
                videoIds = uploadInfo.videoId;
                //console.log("videoIds:" + videoIds);
                var F_Order = $('#F_Order').val();
                var F_Type = $('#select1').val();
                // console.log(F_Type);
                $.post('http://47.103.41.41:8086/api/Video/InsertVideoInfo', {
                    "F_Order": F_Order,
                    "F_Type": F_Type,
                    "F_AliVideoId": videoIds
                }, function (data) {
                    console.log(data);
                }, 'json');
                // console.log（(JSON.stringify(uploadInfo));
                console.log(uploadInfo);
            },
            // 文件上传失败
            onUploadFailed: function (uploadInfo, code, message) {
                console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
                $('#status').text('文件上传失败!');
            },
            // 取消文件上传
            onUploadCanceled: function (uploadInfo, code, message) {
                console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
                $('#status').text('文件已暂停上传!');

            },
            // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
            onUploadProgress: function (uploadInfo, totalSize, progress) {
                console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
                var progressPercent = Math.ceil(progress * 100);
                $('#sts-progress').text(progressPercent);
                $('#status').text('文件上传中...');

            },
            // 上传凭证超时
            onUploadTokenExpired: function (uploadInfo) {
                // 如果是上传方式二即根据 STSToken 实现时，从新获取STS临时账号用于恢复上传
                // 上传文件过大时可能在上传过程中 sts token 就会失效, 所以需要在 token 过期的回调中调用 resumeUploadWithSTSToken 方法
                // 这里是测试接口, 所以我直接获取了 STSToken
                $('#status').text('文件上传超时!');

                var stsUrl = 'http://47.103.41.41:8083/api/AliSts/StsNetSdk';
                $.get(stsUrl, function (data) {
                    var info = JSON.parse(data);
                    console.log(info);
                    // var info = data.SecurityTokenInfo
                    var accessKeyId = info.AccessKeyId;
                    var accessKeySecret = info.AccessKeySecret;
                    var secretToken = info.SecurityToken;
                    var expiration = info.Expiration;
                    uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expiration)
                }, 'json');
            },
            // 全部文件上传结束
            onUploadEnd: function (uploadInfo) {
                $('#status').text('文件上传完毕!');
                console.log("onUploadEnd: uploaded all the files");
                // var F_Order = $('#F_Order').val();
                // //全部文件上传成功，处理视频上传信息
                // var F_Type="my";
                // insertvideo(F_Order,F_Type,videoIds);
            }
        });
        return uploader
    }


    $('#fileUpload').on('change', function (e) {
        console.log(e);
        uploader = createUploader();
        console.log(uploader);
        var file;
        for (let i = 0; i < e.target.files.length; i++) {
            // console.log("file:" + list[i].file.name + ", status:" + list[i].state + ", endpoint:" + list[i].endpoint + ", bucket:" + list[i].bucket + ", object:" + list[i].object);
            //     var file = e.target.files[i];
            file = e.target.files[i];
            var Title = e.target.files[i].name;
            var userData = '{"Vod":{"Title":"' + Title + '","CateId":"1000027679"}}';
            uploader.addFile(file, null, null, null, userData);
            videoList.push(Title);
            // console.log(videoList);
        }

        if (uploader) {
            uploader.stopUpload();
            $('#sts-progress').text('0');
            $('#status').text("");
        }
        // if (!file) {
        //     alert("请先选择需要上传的文件!");
        //     return;
        // }

        $('#stsUpload').attr('disabled', false);
        $('#compile').attr('disabled', false);
        // $('#pauseUpload').attr('disabled', true);
        // $('#resumeUpload').attr('disabled', true);
        // // 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
        // //console.log(userData)
    })
    // 开始上传
    $('#stsUpload').on('click', function () {
        // console.log('1')
        var F_Order = $('#F_Order').val();
        var F_Type = $('#select1').val();
        var IfDuplicate = true;
        if (!F_Order) {
            alert('请输入序号');
        } else {
            for (let i = 0; i < videoList.length; i++) {
                console.log(videoList[i]);
                $.ajax({
                    url: 'http://47.103.41.41:8086/api/Video/IfDuplicate',
                    datatype: "json",
                    type: 'post',
                    async: false,
                    data: {
                        F_Action: "Add",
                        F_Id: "",
                        F_Type: F_Type,
                        F_FileName: videoList[i],
                    },
                    success: function (e) {   //成功后回调
                        // console.log('该文件已存在');
                        if (e.data.status == 1) {
                            alert('该文件已存在');
                            IfDuplicate = false;
                            return i = videoList.length;
                        }
                    },
                    error: function (e) {    //失败后回调
                    },
                    beforeSend: function () {// /发送请求前调用，可以放一些"正在加载"之类额话
                        // alert("正在加载");
                    }
                })
                // console.log(parseInt([i])+1)
                if (parseInt([i]) + 1 == videoList.length) {
                    if (IfDuplicate) {
                        uploader.startUpload();
                        $('#stsUpload').attr('disabled', true);
                    }
                }

            }
        }

        //     uploader.startUpload();
        //     $('#stsUpload').attr('disabled', true);
        //     // $('#pauseUpload').attr('disabled', false)
        // }
        // 然后调用 startUpload 方法, 开始上传
        // if (uploader !== null) {
        // }
    });
    $(".table_tbody").on("click", ".btn-default", function () {  //编辑
        // console.log('1')
        $("#stsUpload").css("display", "none");
        $("#compile").css("display", "block");
        var F_Id = $(this).parents("tr").attr('id');
        $.get('http://47.103.41.41:8086/api/Video/GetVideoInfoById', {F_Id: F_Id}, function (data) {
            // console.log(data);
            $('#F_Order').val(data.data.dt[0].F_Order);
            $('#select1').val(data.data.dt[0].F_Type);

        });
        $(this).parents("tr").css("background-color", "#e5f58c");
    });


    $('#compile').on('click', function () {  //编辑新增
        // console.log('1');
        var F_Order = $('#F_Order').val();
        var F_Type = $('#select1').val();
        // var IfDuplicate = true;
        if (!F_Order) {
            alert('请输入序号');
        } else {
            uploader.startUpload();
            $('#stsUpload').attr('disabled', true);
            var 
        }

    });


    $(".table_tbody").on("click", ".btn-danger", function () {  //删除
        // $(this).parent().remove();
        var F_Id = $(this).parents("tr").attr('id');
        $.get('http://47.103.41.41:8086/api/Video/DeleteVideoInfo', {F_Id: F_Id}, function (data) {
            console.log(data);
        });
        $(this).parents("tr").remove();
    });

    // $('#pauseUpload').on('click', function () {
    //     if (uploader !== null) {
    //         uploader.stopUpload()
    //         $('#resumeUpload').attr('disabled', false)
    //         $('#pauseUpload').attr('disabled', true)
    //     }
    // })

    // $('#resumeUpload').on('click', function () {
    //     if (uploader !== null) {
    //         uploader.startUpload()
    //         $('#resumeUpload').attr('disabled', true)
    //         $('#pauseUpload').attr('disabled', false)
    //     }
    // });
    // $('#dd').on('click', function () {
    //     // window.close();
    //     $(".main").css("display", "block");
    //     $(".container").css("display", "none");
    // });

})


