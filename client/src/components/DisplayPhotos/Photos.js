import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ImageCard from "./ImageCard";
import {
  fetchPhotos,
  updateSearch,
  updateSearchByDate,
  clearSearch,
  clearSearchByDate,
} from "../../actions";
import Calendar from "./Calendar";

const imageGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gridGap: "0 10px",
  gridAutoRows: "10px",
  margin: "20px",
};

const Photos = () => {
  //const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchByDate, setSearchByDate] = useState("");
  const [date, setDate] = useState(new Date());

  const photos = useSelector(
    (state) => Object.values(state.photos),
    shallowEqual
  );
  const dispatch = useDispatch();

  const searchQuery = useSelector((state) => state.search);
  const searchByDateQuery = useSelector((state) => state.searchByDate);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      dispatch(fetchPhotos());
    };
    fetchData();
    if (searchQuery) {
      setSearch(searchQuery.query);
    }
    if (searchByDateQuery) {
      setSearchByDate(searchByDateQuery.query);
    }
  }, [dispatch, searchQuery, searchByDateQuery]);

  function updateSearchBar(e) {
    dispatch(clearSearchByDate());
    setSearchByDate("");
    setSearch(e.target.value.substr(0, 30));
    dispatch(updateSearch(e.target.value.substr(0, 30)));
    setDate(new Date());
  }

  function getDate(date) {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

    return [
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
      date.getFullYear(),
    ].join("/");
  }

  function getDate2(date) {
    var mm = date.substr(5, 2);
    var dd = date.substr(8, 2);
    var yy = date.substr(0, 4);
    return [mm, dd, yy].join("/");
  }

  function returnSearch(photo) {
    const checkTitle =
      photo.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;

    const checkTags = photo.tags.map((tag) => {
      return tag.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    const checkLocation =
      photo.location.toLowerCase().indexOf(search.toLowerCase()) !== -1;

    let checkSearch =
      checkTitle || checkLocation || checkTags.some((tag) => tag === true);

    if (searchByDate.length === 1) {
      const date = getDate(searchByDate[0]);
      if (getDate2(photo.dateTaken) === date) {
        return true;
      }
    }
    if (searchByDate.length === 2) {
      const dateFrom = getDate(searchByDate[0]);
      const dateTo = getDate(searchByDate[1]);
      const dateCheck = getDate2(photo.dateTaken);

      var d1 = dateFrom.split("/");
      var d2 = dateTo.split("/");
      var c = dateCheck.split("/");

      var from = new Date(d1);
      var to = new Date(d2);
      var check = new Date(c);

      if (check >= from && check <= to) {
        return true;
      }
    }

    if (searchByDate) {
      checkSearch = false;
    }

    return checkSearch;
  }

  function updateCalendar(date) {
    dispatch(clearSearch());
    setSearch("");
    setSearchByDate(date);
    dispatch(updateSearchByDate(date));
  }

  function clearSearches() {
    dispatch(clearSearch());
    setSearch("");
    dispatch(clearSearchByDate());
    setSearchByDate("");
    setDate(new Date());
  }

  function renderGrid() {
    if (Object.keys(photos).length !== 0) {
      const filteredPhotos = photos.filter((photo) => {
        return returnSearch(photo);
      });
      if (filteredPhotos.length === 0) {
        return (
          <h3>
            There are no photos that match this search, please try another
            keyword or date
          </h3>
        );
      }
      return filteredPhotos.map((image) => {
        return <ImageCard key={image._id} image={image} />;
      });
    } else {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      );
    }
  }
  return (
    <div className="ui container" style={{ paddingTop: "1em" }}>
      <div className="ui stackable grid">
        <div className="six wide column">
          <div className="ui fluid icon input">
            <input
              type="text"
              placeholder="Search photos e.g. 'beach, city, nature, Albany'"
              value={search}
              onChange={(e) => updateSearchBar(e)}
            />
            <i className="search icon" />
          </div>
        </div>

        <div className="six wide column">
          <div className="ui fluid left icon right action input">
            <i className="calendar icon" />
            <Calendar
              updateCalendar={updateCalendar}
              clear={clearSearches}
              date={date}
              setDate={setDate}
            />
          </div>
        </div>
        <div className="four wide column">
          <button
            className="ui fluid red basic button"
            onClick={() => clearSearches()}
          >
            Clear filters
          </button>
        </div>
      </div>

      <div className="image-list" style={imageGrid}>
        {renderGrid()}
      </div>
    </div>
  );
};

export default Photos;
