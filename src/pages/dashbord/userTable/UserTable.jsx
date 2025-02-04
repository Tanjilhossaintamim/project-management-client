import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
} from "@material-tailwind/react";
import moment from "moment/moment";
import EditOption from "./EditOption";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import classNames from "classnames";
const TABS = [
  {
    label: "Employee",
    value: "employee",
  },
  {
    label: "Manager",
    value: "manager",
  },
  {
    label: "Panding",
    value: "notvarified",
  },
];

const TABLE_HEAD = ["Employee", "Role", "Status", "Join Date", ""];

export default function EmployeeTable({
  results,
  setrole,
  setvarified,
  currentPage,
  setCurrentPage,
  setName,
  refetch,
  setSort,
  sort,
}) {
  const { user } = useSelector((state) => state.auth);

  const [itemPerPage] = useState(8);
  const totalPage = Math.ceil(results?.count / itemPerPage);

  // this funtion willbe handel set query
  const handelSetQuery = (value) => {
    if (value === "notvarified") {
      setCurrentPage(1);
      setrole("employee");
      setvarified(false);
    } else {
      setCurrentPage(1);
      setrole(value);
      setvarified(true);
    }
  };

  const handelSetCurrentPage = (page) => {
    setCurrentPage(page);
  };

  // debounce handeling for input box
  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  function saveInput(value) {
    setName(value);
  }
  const handelOnchange = debounce((value) => saveInput(value));

  // handel sort value
  const handelSort = () => {
    setSort(sort == "desc" ? "asc" : "desc");
  };

  return (
    <Card className=" w-full z-0">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => refetch()}
              variant="gradient"
              className="flex items-center gap-3"
            >
              Refresh
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="employee" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => handelSetQuery(value)}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              onChange={(e) => handelOnchange(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    onClick={head == "Employee" ? handelSort : () => ""}
                    className={classNames({
                      "font-normal leading-none opacity-70 flex items-center": true,
                      "cursor-pointer": head == "Employee",
                    })}
                  >
                    {head}{" "}
                    {head == "Employee" &&
                      (sort == "desc" ? (
                        <IoIosArrowRoundDown
                          className="text-lg"
                          // onClick={handelSort}
                        />
                      ) : (
                        <IoIosArrowRoundUp
                          className="text-lg"
                          // onClick={handelSort}
                        />
                      ))}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results?.users?.length == 0 && (
              <tr className="text-lg text-center font-bold capitalize">
                <td> no user Found</td>
              </tr>
            )}
            {results?.users?.map(
              (
                {
                  _id,
                  firstName,
                  lastName,
                  email,
                  role,
                  isVarified,
                  createdAt,
                },
                index
              ) => {
                const isLast = index === results.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={`https://source.unsplash.com/random/?profile&${index}`}
                          alt={firstName}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {firstName + " " + lastName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70 capitalize"
                        >
                          {role}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={isVarified ? "Varified" : "Not Varified"}
                          color={isVarified ? "green" : "red"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moment(createdAt).format("DD MMM YYYY")}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {/* action */}
                      {user?.email == email ? (
                        <p>You</p>
                      ) : (
                        <EditOption user={{ _id, role, isVarified }} />
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPage}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => handelSetCurrentPage(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === totalPage}
            onClick={() => handelSetCurrentPage(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
