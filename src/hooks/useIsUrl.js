export default function useIsUrl(string) {
  const regex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  const imgRegex =
    /([0-9]+([A-Za-z]+[0-9]+)+)\/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}\.jpeg/i;
  if (imgRegex.test(string)) {
    return "img";
  } else if (regex.test(string)) {
    return "anchor";
  } else {
    return false;
  }
}
