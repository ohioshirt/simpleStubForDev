const fs = require('fs');

const basePath = "stubs/response/";
const files = fs.readdirSync(basePath);
const fileList = files.filter(function(file){
    return fs.statSync(basePath + file).isFile() && /.*\.json$/.test(file); //絞り込み
});
const paths = fileList.map(f => "/" + f.replace(".json", ""));

function getJsonContent(entryPoint) {
    console.log(`getJsonContent: ${entryPoint}`);
    try {
        const json = fs.readFileSync(`stubs/response/${entryPoint}.json`, 'utf8');
        return json;
    } catch (e) {
        console.error(e);
        return '{"result": "no entry"}';
    }
}

function getDefaultResponse(entryPoint) {
    try {
        const json = fs.readFileSync(`stubs/default/${entryPoint}.json`, 'utf8');
        return json;
    } catch (e) {
        console.error(e);
        return '{"result": "no entry"}';
    }
}

function updateJson(entryPoint, data) {
    console.log(`updateJson: /${entryPoint}.json`);
    try {
        fs.writeFileSync(`stubs/response/${entryPoint}.json`, data);
    } catch (e) {
        console.error(e);
    }
}

function resetToDefault(entryPoint) {
    const from = `stubs/default/${entryPoint}.json`;
    const to = `stubs/response/${entryPoint}.json`;
    try {
        fs.copyFileSync(from, to);
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    list: fileList,
    paths: paths,
    get: getJsonContent,
    getDefault: getDefaultResponse,
    update: updateJson,
    reset: resetToDefault
};
