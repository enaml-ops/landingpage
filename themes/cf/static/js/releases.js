var OMG_GITHUB_REPO = "enaml-ops/omg-cli"

jQuery(function($) {
  //setDownloadLinksToLatestVersion();
  getLatestGithubRelease(OMG_GITHUB_REPO);
});

// A slightly modified version of:
// https://stackoverflow.com/questions/24987542/is-there-a-link-to-github-for-downloading-a-file-in-the-latest-release-of-a-repo
function getLatestGithubRelease(repo) {
    var url = "https://api.github.com/repos/" + repo + "/releases/latest"
    $.getJSON(url).done(function (release) {

      // update the version in the header
      $("#version").text("Latest Release " + release.tag_name);

      // update individual download links
      for (var j = 0; j < release.assets.length; j++) {
        var asset = release.assets[j];
        console.log("found release: " + asset.name)

        // TODO: for now this is kind of brute forced to search for omg only
        if (!asset.name.startsWith("omg-")) {
          continue;
        }
        var parts = asset.name.split('-');
        var platform = parts.pop(); // 'osx', 'linux', etc.
        var downloadCount = asset.download_count;

        // compute time since last update
        var oneHour = 60 * 60 * 1000
        var oneDay = 24 * oneHour
        var dateDiff = new Date() - new Date(asset.updated_at)
        var timeAgo;
        if (dateDiff < oneDay) {
          timeAgo = (dateDiff / oneHour).toFixed(0) + " hours ago";
        } else {
          timeAgo = (dateDiff / oneDay).toFixed(0) + " days ago";
        }

        var sel
        switch (platform) {
          case "osx":
            sel = ".fa-apple ";
            break;
          case "linux":
            sel = ".fa-linux ";
            break;
          // TODO: we aren't currently publishing windows releases...
          default:
            continue;
        }

        // update download link
        $(sel + "a").attr("href", asset.browser_download_url)

        // add release info
        var releaseInfo = "updated " + timeAgo + ", " + plural(downloadCount);
        $(sel + "span").text(releaseInfo);
        $(sel + "span").fadeIn("slow");
      }
    })
}

function plural(count) {
  if (count == 1) {
    return count.toLocaleString() + " download"
  }
  return count.toLocaleString() + " downloads"
}
