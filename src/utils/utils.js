
export const utils = {

  getPlayersList: (page, search) => {

    return new Promise((resolve, reject) => {
      let get = `${process.env.REACT_APP_PLAYERS_LIST}?per_page=100`;
      if (page) get += `&page=${page}`;
      if (search) get += `&search=${search}`;
      fetch(get)
        .then(response => response.json())
        .then(data => resolve(data));
    });

  },

  getPlayerInfo: (playerId) => {

    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_PLAYERS_STATS}?season=2018&player_ids[]=${playerId}`)
        .then(response => response.json())
        .then(averages => {
          fetch(`${process.env.REACT_APP_PLAYERS_LIST}/${playerId}`)
            .then(response => response.json())
            .then(data => resolve({
                averages: (averages.data.length > 0 ? averages.data[0] : null),
                data: data
              }))
              .catch(err => resolve({
                  averages: averages,
                  data: null
                }));
        });
    });

  }

};
