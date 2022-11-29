export default function displayDate(ms) {
    const diffMs = Date.now() - ms;
    if (diffMs <= 60000) {
        return "1 минуту назад";
    } else {
        if (diffMs > 60000 && diffMs <= 300000) {
            return "5 минуту назад";
        } else {
            if (diffMs > 300000 && diffMs <= 600000) {
                return "10 минуту назад";
            } else {
                if (diffMs > 600000 && diffMs <= 1800000) {
                    return "30 минуту назад";
                } else {
                    if (diffMs > 1800000 && diffMs <= 86_400_000) {
                        return `${new Date(ms).getHours()}.${new Date(
                            ms
                        ).getMinutes()}`;
                    } else {
                        if (diffMs > 86_400_00 && diffMs <= 31_536_000_000) {
                            return `${new Date(ms).getDate()}.${
                                new Date(ms).getMonth() + 1
                            }`;
                        } else {
                            return `${new Date(ms).getDate()}.${
                                new Date(ms).getMonth() + 1
                            }.${new Date(ms).getFullYear()}`;
                        }
                    }
                }
            }
        }
    }
}
