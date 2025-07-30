import { forwardRef } from "react";
import { getOperatorFromCookie } from "../helpers/cookie-parser";
import { ColorRing } from "react-loader-spinner";
import { truncate } from "@/helpers/string-helpers";
import { REVAMPED_MODULES } from "@/constants/NavbarConstants";

const OldCrmRightsList = forwardRef(function OldCrmRightsList(
  { oldCrmRights, getOldCrmRights, loadingRights },
  ref
) {
  const operator = getOperatorFromCookie();

  if (loadingRights) {
    return (
      <div
        tabIndex={0}
        ref={ref}
        className="d-flex align-items-center px-3 py-2 mega-menu-container no-rights"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="my-0 ml-3">Loading Rights</p>
        <ColorRing
          visible={true}
          height="40"
          width="40"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#284E93", "#284E93", "#284E93", "#284E93", "#284E93"]}
        />
      </div>
    );
  }

  if (oldCrmRights?.length < 1) {
    return (
      <div
        tabIndex={0}
        ref={ref}
        className="d-flex align-items-center px-3 py-2 mega-menu-container no-rights"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="my-0 ml-3"> No Rights Found</p>

        <button
          onClick={() => getOldCrmRights(operator)}
          class="reload-btn ml-3"
          title="Reload"
        >
          <i class="fa fa-refresh"></i>
        </button>
      </div>
    );
  }
  return (
    <div
      tabIndex={0}
      ref={ref}
      className="px-5 py-4 mega-menu-container"
      style={{ width: "fit-content" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="row">
        {oldCrmRights.map((right, index) => (
          <div style={{ width: right.APP_NAME ? "25%" : "250px" }}>
            <ul className="mega-sub-menu">
              <li>
                {right.APP_NAME && (
                  <span className="mega-menu-sub-title">{right.APP_NAME}</span>
                )}

                <ul className="mega-sub-menu-scroll">
                  {right?.modules?.map((module, moduleIndex) =>
                    !REVAMPED_MODULES.includes(module.MODULE_NAME) ? (
                      <li key={moduleIndex} className="mb-2">
                        <a
                          title={module.MODULE_NAME}
                          className="font-14 weight-400 text-dark"
                          href={module.FULL_URL}
                          target="_blank"
                        >
                          {truncate(module.MODULE_NAME, 24)}
                        </a>
                      </li>
                    ) : null
                  )}
                </ul>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
});

export default OldCrmRightsList;
