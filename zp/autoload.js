// 注意：live2d_path 参数应使用绝对路径
const live2d_path = "https://cdn.jsdelivr.net/gh/zpblogs/live2d_api@1.0/";
//const live2d_path = "zp/";

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;

		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

// 加载 waifu.css live2d.min.js waifu-tips.js
if (screen.width >= 768) {
	Promise.all([
		loadExternalResource(live2d_path + "zp/zp.css", "css"),
		loadExternalResource(live2d_path + "zp/font-awesome.min.css", "css"),
		loadExternalResource(live2d_path + "zp/live2d.min.js", "js"),
		loadExternalResource(live2d_path + "zp/waifu-tips.js", "js")
	]).then(() => {
	    initWidget({
	        waifuPath: live2d_path + "zp/waifu-tips.json",
			cdnPath: "https://zpblogs.gitee.io/live2d_api/"
		});
	});
}
// initWidget 第一个参数为 waifu-tips.json 的路径，第二个参数为 API 地址
// API 后端可自行搭建，参考 https://github.com/fghrsh/live2d_api
// 初始化看板娘会自动加载指定目录下的 waifu-tips.json

