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
    var uploader = new AliyunUpload.Vod({
        //阿里账号ID，必须有值 ，值的来源https://help.aliyun.com/knowledge_detail/37196.html
        userId: "1494058750874094",
        //分片大小默认1M，不能小于100K
        partSize: 1048576,
        //并行上传分片个数，默认5
        parallel: 5,
        //网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        //网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        //是否上报上传日志到点播，默认为true
        enableUploadProgress: true,
        // 开始上传
        onUploadstarted: function (uploadInfo) {
            console.log(uploadInfo);
            console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
            //上传方式1, 需要根据uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress，如果videoId有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
            if (uploadInfo.videoId) {
                // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
            } else {
                // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
            }
            // var stsUrl = 'http://47.103.41.41:8086/api/ImageAuth/GetUploadAuth';

            $.getJSON("http://47.103.41.41:8086/api/ImageAuth/GetUploadAuth", {}, function (data) {
                // console.log(data)
                var uploadAuth = data.data.response.UploadAuth;
                var uploadAddress = data.data.response.uploadAddress;
                var ImageId = data.data.response.ImageId;
                // var secretToken = info.SecurityToken
                // uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
                uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, ImageId);

            });


            // $.get(stsUrl, function (data) {
            //     var uploadAuth = data.UploadAuth;
            //     var uploadAddress = data.uploadAddress;
            //     var ImageId = data.ImageId;
            //     // var secretToken = info.SecurityToken
            //     // uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
            //     uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, ImageId);
            // }, 'json')


            //从点播服务获取的uploadAuth、uploadAddress和videoId,设置到SDK里
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
            console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object);
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
            log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message);
        },
        // 文件上传进度，单位：字节
        onUploadProgress: function (uploadInfo, totalSize, loadedPercent) {
            log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(loadedPercent * 100) + "%");
        },
        // 上传凭证超时
        onUploadTokenExpired: function (uploadInfo) {
            console.log("onUploadTokenExpired");
            //实现时，根据uploadInfo.videoId调用刷新视频上传凭证接口重新获取UploadAuth
            //https://help.aliyun.com/document_detail/55408.html
            //从点播服务刷新的uploadAuth,设置到SDK里
            uploader.resumeUploadWithAuth(uploadAuth);
        },
        //全部文件上传结束
        onUploadEnd: function (uploadInfo) {
            console.log("onUploadEnd: uploaded all the files");
        }
    });


    userData = '';
    document.getElementById("fileUpload").addEventListener('change', function (event) {
        console.log(event);
        for (var i = 0; i < event.target.files.length; i++) {
            // 逻辑代码
            uploader.addFile(event.target.files[i], null, null, null, null);

        }


    });
    $('#stsUpload').on('click', function () {
        // console.log('1')
        uploader.startUpload()
    })

    /*** 创建一个上传对象
     * 使用 STSToken 上传方式*/
    // function createUploader() {
    //     var uploader = new AliyunUpload.Vod({
    //         timeout: $('#timeout').val() || 60000,
    //         partSize: $('#partSize').val() || 1048576,
    //         parallel: $('#parallel').val() || 5,
    //         retryCount: $('#retryCount').val() || 3,
    //         retryDuration: $('#retryDuration').val() || 2,
    //         region: $('#region').val(),
    //         userId: $('#userId').val(),
    //         // 添加文件成功
    //         addFileSuccess: function (uploadInfo) {
    //             $('#stsUpload').attr('disabled', false)
    //             $('#resumeUpload').attr('disabled', false)
    //             $('#status').text('添加文件成功, 等待上传...')
    //             console.log("addFileSuccess: " + uploadInfo.file.name)
    //         },
    //         // 开始上传
    //         onUploadstarted: function (uploadInfo) {
    //             // 如果是 STSToken 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
    //             // 用户需要自己获取 accessKeyId, accessKeySecret,secretToken
    //             // 下面的 URL 只是测试接口, 用于获取 测试的 accessKeyId, accessKeySecret,secretToken
    //
    //             var stsUrl = "http://47.103.41.41:8083/api/AliSts/StsNetSdk";
    //             $.getJSON(stsUrl, function (data) {
    //                 var info = JSON.parse(data);
    //
    //                 var accessKeyId = info.AccessKeyId;
    //                 var accessKeySecret = info.AccessKeySecret;
    //                 var secretToken = info.SecurityToken;
    //
    //                 uploader.setSTSToken(uploadInfo, accessKeyId, accessKeySecret, secretToken)
    //             });
    //
    //
    //             $('#status').text('文件开始上传...')
    //             console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" +
    //                 uploadInfo.bucket + ", object:" + uploadInfo.object)
    //         },
    //         // 文件上传成功
    //         onUploadSucceed: function (uploadInfo) {
    //             console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" +
    //                 uploadInfo.bucket + ", object:" + uploadInfo.object)
    //             $('#status').text('文件上传成功!')
    //
    //
    //             videoIds = uploadInfo.videoId;
    //             //
    //             console.log("videoIds:" + videoIds);
    //             // console.log（(JSON.stringify(uploadInfo));
    //             console.log(uploadInfo);
    //         },
    //         // 文件上传失败
    //         onUploadFailed: function (uploadInfo, code, message) {
    //             console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
    //             $('#status').text('文件上传失败!')
    //         },
    //         // 取消文件上传
    //         onUploadCanceled: function (uploadInfo, code, message) {
    //             console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
    //             $('#status').text('文件已暂停上传!')
    //
    //         },
    //         // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
    //         onUploadProgress: function (uploadInfo, totalSize, progress) {
    //             console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" +
    //                 Math.ceil(progress * 100) + "%")
    //             var progressPercent = Math.ceil(progress * 100)
    //             $('#sts-progress').text(progressPercent)
    //             $('#status').text('文件上传中...')
    //
    //         },
    //         // 上传凭证超时
    //         onUploadTokenExpired: function (uploadInfo) {
    //             // 如果是上传方式二即根据 STSToken 实现时，从新获取STS临时账号用于恢复上传
    //             // 上传文件过大时可能在上传过程中 sts token 就会失效, 所以需要在 token 过期的回调中调用 resumeUploadWithSTSToken 方法
    //             // 这里是测试接口, 所以我直接获取了 STSToken
    //             $('#status').text('文件上传超时!')
    //
    //             var stsUrl = 'http://47.103.41.41:8083/api/AliSts/StsNetSdk';
    //             $.get(stsUrl, function (data) {
    //                 var info = JSON.parse(data);
    //                 console.log(info);
    //                 // var info = data.SecurityTokenInfo
    //                 var accessKeyId = info.AccessKeyId
    //                 var accessKeySecret = info.AccessKeySecret
    //                 var secretToken = info.SecurityToken
    //                 var expiration = info.Expiration
    //                 uploader.resumeUploadWithSTSToken(accessKeyId, accessKeySecret, secretToken, expiration)
    //             }, 'json')
    //
    //
    //         },
    //         // 全部文件上传结束
    //         onUploadEnd: function (uploadInfo) {
    //             $('#status').text('文件上传完毕!')
    //             console.log("onUploadEnd: uploaded all the files")
    //
    //
    //         }
    //     })
    //     return uploader
    // }
    //
    // // var videoIds;
    // var uploader = null
    //
    // $('#fileUpload').on('change', function (e) {
    //     console.log(e);
    //
    //     uploader = createUploader();
    //     // console.log(e.target.files.length);
    //     var file;
    //     for (let i = 0; i < e.target.files.length; i++) {
    //         // console.log("file:" + list[i].file.name + ", status:" + list[i].state + ", endpoint:" + list[i].endpoint + ", bucket:" + list[i].bucket + ", object:" + list[i].object);
    //         //     var file = e.target.files[i];
    //         file = e.target.files[i];
    //         var Title = e.target.files[i].name;
    //         var userData = '{"Vod":{"Title":"' + Title + '","CateId":"1000027679"}}';
    //         uploader.addFile(file, null, null, null, userData);
    //
    //     }
    //     if (!file) {
    //         alert("请先选择需要上传的文件!");
    //         return;
    //     }
    //     // console.log(file);
    //
    //     //console.log(Title);
    //     if (uploader) {
    //         uploader.stopUpload()
    //         $('#sts-progress').text('0');
    //         $('#status').text("");
    //     }
    //
    //     // uploader.listFiles();
    //     // var list = uploader.listFiles();
    //     // for (var i = 0; i < list.length; i++) {
    //     //     log("file:" + list[i].file.name + ", status:" + list[i].state + ", endpoint:" + list[i].endpoint + ", bucket:" + list[i].bucket + ", object:" + list[i].object);
    //     // }
    //
    //
    //     // 首先调用 uploader.addFile(event.target.files[i], null, null, null, userData)
    //     //console.log(userData)
    //     $('#stsUpload').attr('disabled', false)
    //     $('#pauseUpload').attr('disabled', true)
    //     $('#resumeUpload').attr('disabled', true)
    // })
    // // 开始上传
    // $('#stsUpload').on('click', function () {
    //     // 然后调用 startUpload 方法, 开始上传
    //     console.log('1');
    //     // uploader.listFiles();
    //     // var list = uploader.listFiles();
    //     // for (var i = 0; i < list.length; i++) {
    //     //     console.log("file:" + list[i].file.name + ", status:" + list[i].state + ", endpoint:" + list[i].endpoint + ", bucket:" + list[i].bucket + ", object:" + list[i].object);
    //     // }
    //
    //     // if (uploader !== null) {
    //     uploader.startUpload()
    //     $('#stsUpload').attr('disabled', true)
    //     $('#pauseUpload').attr('disabled', false)
    //     // }
    // })
    //
    // $('#pauseUpload').on('click', function () {
    //     if (uploader !== null) {
    //         uploader.stopUpload()
    //         $('#resumeUpload').attr('disabled', false)
    //         $('#pauseUpload').attr('disabled', true)
    //     }
    // })
    //
    // $('#resumeUpload').on('click', function () {
    //     if (uploader !== null) {
    //         uploader.startUpload()
    //         $('#resumeUpload').attr('disabled', true)
    //         $('#pauseUpload').attr('disabled', false)
    //     }
    // });
    //
    //
    // $('#dd').on('click', function () {
    //     // window.close();
    //     $(".main").css("display", "block");
    //     $(".container").css("display", "none");
    // });

})
