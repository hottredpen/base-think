/**
 * Created by einsqing on 16/1/26.
 */
var fs = require('co-fs-extra');
var moment = require('moment');
var uuid = require('node-uuid');
var os = require('os');
var path = require('path');

var FileModel = require('./../../../app/model/file.model');

function *ueditor(next) {
    if (this.query.action === 'config') {
        var config = yield fs.readFile(__dirname + "/config.json", 'utf8');
        this.body = config;
    } else if (this.query.action === 'listimage') {
        this.body = yield ue_pic_list(this.query.start, this.query.size);
    } else if (this.query.action === 'uploadimage') {
        var files = this.request.body.files;

        var tmp_name;
        var file_path;
        var filename;

        for (var i in files) {
            var file = files[i];

            var ext = '';  //后缀名
            switch (file.type) {
                case 'image/pjpeg':
                    ext = 'jpg';
                    break;
                case 'image/jpeg':
                    ext = 'jpg';
                    break;
                case 'image/png':
                    ext = 'png';
                    break;
                case 'image/x-png':
                    ext = 'png';
                    break;
            }

            var savepath = moment().format('YYYY-MM-DD') + '/';
            var savename = uuid.v1() + '.' + ext;

            var err = yield fs.move(file.path, 'public/uploads/' + savepath + savename);
            if (!err) {
                var data = {
                    name: file.name,
                    ext: ext,
                    type: file.type,
                    savename: savename,
                    savepath: savepath
                };

                yield FileModel.add(data);

                file_path = '/public/uploads/' + savepath + savename;
                filename = savename;
                tmp_name = file.path;

                console.log("success!");
            } else {
                console.log("fail!");
            }

        }

        this.body = {
            'url': file_path,
            'title': filename,
            'original': tmp_name,
            'state': 'SUCCESS'
        }
    } else {
        this.body = {
            'state': 'FAIL'
        };
    }
}

function *ue_pic_list(start, size) {
    var list = [];
    var files = yield FileModel.getQueryList({
        limit: size,
        offset: parseInt(start)
    });

    for (var i in files) {
        if (i >= start && i < (parseInt(start) + parseInt(size))) {
            var file = files[i];
            list.push({url: '/public/uploads/' + file.savepath + file.savename});
        }
    }
    return {
        "state": "SUCCESS",
        "list": list,
        "start": start,
        "total": files.length
    }
}

module.exports = ueditor;