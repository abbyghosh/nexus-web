import React, { useContext, useEffect, useState } from "react";
import axiosConfig from "../../axiosConfig";
import { GlobalContext } from "../../context/GlobalState";

import Button from "../common/Button/Button";
import Modal from "../common/Modal/Modal";
import ToolModal from "./ToolModal/ToolModal";
import ConfirmationDialog from "../common/Modal/ConfirmationDialog/ConfirmationDialog";
import Loading from "../common/Loading/Loading";

import { ReactComponent as DeleteIcon } from "../../../src/assets/icons/delete.svg";

import { WESBITE } from "../../utils/api";

import "./tools.scss";

function Websites() {
  let {
    toast: { toastDispatch },
  } = useContext(GlobalContext);

  const [tools, setWebsites] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(0);

  // [
  //   {
  //     name: "Iconfinder",
  //     url: "https://www.iconfinder.com/",
  //     description: "Get free icons",
  //     tags: ["Icons"],
  //   },
  //   {
  //     name: "Uxwing",
  //     url: "https://uxwing.com/svg-icon-editor/",
  //     description: "Create and Edit SVGs",
  //     tags: ["SVG"],
  //   },
  //   {
  //     name: "Pave Pdf",
  //     url: "https://pave-pdf.org/pave/index.html#",
  //     description: "PDF Validator",
  //     tags: ["PDF", "Validator"],
  //   },
  // ]

  useEffect(() => {
    getAllWebsites();
  }, []);

  const getAllWebsites = async (params) => {
    try {
      setSubmitting(true);
      const {
        data: { result },
      } = await axiosConfig.get(WESBITE);
      console.log("Got", result);
      setWebsites(result);
    } catch ({ response: res }) {
      let errMsg = res.status === 401 ? res.data.message : JSON.stringify(res.data);

      toastDispatch({
        type: "ERROR",
        payload: errMsg,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddClose = () => {
    setIsAddModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      setSubmitting(true);
      const {
        data: { message },
      } = await axiosConfig.delete(`${WESBITE}/${id}`);
      getAllWebsites();
      toastDispatch({
        type: "SUCCESS",
        payload: message,
      });
    } catch ({ response: res }) {
      let errMsg = res.status === 401 ? res.data.message : JSON.stringify(res.data);

      toastDispatch({
        type: "ERROR",
        payload: errMsg,
      });
    } finally {
      setSubmitting(false);
      setDeleteConfirmOpen(0);
    }
  };

  const replaceUrlPrefix = (url) => {
    let replacedUrl = "";

    ["https://www.", "http://www.", "https://", "http://"].some((ele) => {
      if (url.includes(ele)) {
        replacedUrl = url.replace(ele, "");
        return true;
      }
      return false;
    });

    return replacedUrl || url;
  };

  return (
    <>
      <main className="tools">
        {submitting ? (
          <Loading />
        ) : (
          <>
            <div className="sub-head">
              <div className="filter-by-tags">
                Tags:<div> </div>
              </div>
              <Button variant="light" onClick={() => setIsAddModalOpen(true)}>
                Add
              </Button>
            </div>
            <div className="tools-wrapper">
              {tools.map((ele) => (
                <section key={ele._id}>
                  <a href={ele.url} target="_blank" rel="noreferrer">
                    <div className="name">{ele.name}</div>
                    <span>|</span>
                    <div className="url">{replaceUrlPrefix(ele.url)}</div>
                  </a>
                  <div className="desc-container">
                    <p>{ele.description}</p>
                    <DeleteIcon width="20" onClick={() => setDeleteConfirmOpen(ele._id)} />
                  </div>
                  <div className="tags">
                    {ele.tags.map((ele) => (
                      <span key={ele} className="tag">
                        {ele}
                      </span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}
      </main>
      <Modal header="Login" isOpen={isAddModalOpen} handleCLose={handleAddClose}>
        <ToolModal
          handleCLose={() => {
            handleAddClose();
            getAllWebsites();
          }}
        />
      </Modal>

      <ConfirmationDialog
        isOpen={deleteConfirmOpen}
        closeModal={() => setDeleteConfirmOpen(0)}
        handleAccept={() => {
          handleDelete(deleteConfirmOpen);
        }}
      >
        <p>Are you sure to mark the movie seen?</p>
      </ConfirmationDialog>
    </>
  );
}

export default Websites;
