// const media = `
// fragment media on Media{
//   id
//   title{userPreferred}
//   coverImage{extraLarge large color}
//   startDate{year month day}
//   endDate{year month day}
//   bannerImage
//   season
//   seasonYear
//   description
//   type
//   format
//   status(version:2)
//   episodes
//   duration
//   chapters
//   volumes
//   genres
//   isAdult
//   averageScore
//   popularity
//   nextAiringEpisode{airingAt timeUntilAiring episode}
//   mediaListEntry{id status}
//   studios(isMain:true){
//       edges{
//           isMain
//           node{id name}
//       }
//   }
// }
// `;
const media = `
fragment media on Media{
  id
  title{userPreferred}
  coverImage{extraLarge large color}
  bannerImage
  description
  seasonYear
  averageScore
  type
  format
  status(version:2)
  episodes
  duration
  genres
  studios(isMain:true){
      edges{
          isMain
          node{id name}
      }
  }
}
`;

module.exports = { media };
