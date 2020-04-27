import humanizeString from 'humanize-string';

function groupSortToken(groupName) {
  switch (groupName) {
    case 'breaking change':
      return 'a';

    case 'feat':
      return 'b';

    case 'enhancement':
      return 'c';

    case 'fix':
      return 'd';

    default:
      return 'e';
  }
}

export function commitTypeName(groupName) {
  switch (groupName) {
    case 'chore':
      return 'Chore';

    case 'docs':
      return 'Doc Update';

    case 'feat':
      return 'New Feature';

    case 'fix':
      return 'Bug Fix';

    case 'perf':
      return 'Perf Improvement';

    default:
      return humanizeString(groupName);
  }
}

export function sortCommitTypes(types) {
  return types.sort((a, b) => groupSortToken(a) > groupSortToken(b));
}

export default { commitTypeName, sortCommitTypes };
