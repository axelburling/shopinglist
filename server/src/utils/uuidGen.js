class UUID {
  v2() {
    var S2 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S2() + S2() + "-" + S2() + "-" + S2() + "-" + S2();
  }

  v3() {
    var S3 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S3() + S3() + "-" + S3() + "-" + S3() + "-" + S3() + "-" + S3();
  }

  v4() {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }

  v5() {
    const S5 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    const date = new Date();
    const y = date.getFullYear();
    const min = date.getMinutes();
    const t = date.getTime();

    return (
      y +
      "--=1" +
      S5() +
      S5() +
      S5() +
      S5() +
      "-" +
      S5() +
      "-" +
      t +
      "-" +
      S5() +
      "-" +
      S5() +
      "-" +
      S5() +
      S5() +
      S5() +
      S5() +
      min +
      "+++=2"
    );
  }
}

module.exports = new UUID();
