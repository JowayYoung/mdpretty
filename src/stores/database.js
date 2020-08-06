import Crypto from "crypto";
import { remote } from "electron";
import Nedb from "nedb-promises";

const algorithm = "aes-128-cbc"; // 加密算法类型
const password = "react-electron"; // 生成秘钥密码
const key = crypto.scryptSync(password, "salt", 16); // 秘钥
const iv = Buffer.alloc(16, 0); // 初始化向量

const dbPath = remote.app.getAppPath("userData");
console.log("数据存储路径：", dbPath);

const DB = {
	markdown: new Nedb({
		afterSerialization(plaintext) {
			const cipher = Crypto.createCipheriv(algorithm, key, iv);
			let crypted = cipher.update(plaintext, "utf-8", "hex");
			crypted += cipher.final("hex");
			return crypted;
		},
		autoload: true,
		beforeDeserialization(ciphertext) {
			const decipher = Crypto.createDecipheriv(algorithm, key, iv);
			let decrypted = decipher.update(ciphertext, "hex", "utf-8");
			decrypted += decipher.final("utf-8");
			return decrypted;
		},
		filename: dbPath,
		timestampData: true
	})
};

export default DB;