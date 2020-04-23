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
    if (photo.dateTaken === searchByDate) {
      return true;
    }

    if (searchByDate) {
      checkSearch = false;
    }

    return checkSearch;
  }

  function updateCalendar(e) {
    dispatch(clearSearch());
    setSearch("");
    setSearchByDate(e.target.value);
    dispatch(updateSearchByDate(e.target.value));
  }

  function clearSearches() {
    dispatch(clearSearch());
    setSearch("");
    dispatch(clearSearchByDate());
    setSearchByDate("");
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
        <div className="nine wide column">
          <div className="ui fluid icon input">
            <input
              type="text"
              placeholder="Search by keyword..."
              value={search}
              onChange={(e) => updateSearchBar(e)}
            />
            <i className="search icon" />
          </div>
        </div>

        <div className="four wide column">
          <div className="ui fluid icon input" style={{ height: "2.65em" }}>
            <input
              type="date"
              value={searchByDate}
              onChange={(e) => updateCalendar(e)}
            />
            <i className="calendar icon" />
          </div>
        </div>
        <div className="three wide column">
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
