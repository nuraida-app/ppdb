import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useMyPaymentQuery } from "../../api/services/ApiPembayaran";
import NotAllowed from "../NotAllowed";
import {
  useCreateAnswerMutation,
  useGetAnswerQuery,
  useGetQuizzesQuery,
} from "../../api/services/ApiKuis";
import { toast } from "react-toastify";

const createMarkup = (html) => {
  return { __html: html };
};

const Kuisioner = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const [answerType1, setAnswerType1] = useState({});

  const { user } = useSelector((state) => state.user);
  const { data } = useMyPaymentQuery(user?.id, { skip: !user?.id });

  const { data: questions } = useGetQuizzesQuery({ page, limit, search });

  const { data: answers } = useGetAnswerQuery(user?.id, { skip: !user?.id });
  const [createAnswer, { data: msg, isSuccess, isLoading, error, reset }] =
    useCreateAnswerMutation();

  const type1 = questions?.filter(
    (item) => item.jenis === "Kuisioner" && item.pengisi === "Ortu"
  );
  const type2 = questions?.filter(
    (item) => item.jenis === "Angket" && item.pengisi === "Ortu"
  );
  const type3 = questions?.filter(
    (item) => item.jenis === "Angket" && item.pengisi === "Calon Peserta Didik"
  );

  const handleAnswerChange = (quizId, value) => {
    setAnswerType1((prev) => ({
      ...prev,
      [quizId]: value,
    }));
  };

  const addAnswerForType1 = (id) => {
    const answerForQuestion = answerType1[id];

    if (!answerForQuestion || answerForQuestion.trim() === "") {
      toast.error("Jawaban tidak boleh kosong.");
      return;
    }

    const dataToSend = {
      userId: user?.id,
      answer: answerForQuestion,
      quizId: id,
    };

    createAnswer(dataToSend);
  };

  const addType2_3 = (id, value) => {
    const dataToSend = {
      userId: user?.id,
      answer: value,
      quizId: id,
    };

    createAnswer(dataToSend);
  };

  useEffect(() => {
    // Prepopulate answers if available
    if (answers) {
      const prefilledAnswers = {};
      answers.forEach((answer) => {
        prefilledAnswers[answer.soal_id] = answer.jawaban;
      });

      console.log(prefilledAnswers);
      setAnswerType1(prefilledAnswers);
    }
  }, [answers]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      reset();
    }

    if (error) {
      console.log(error);
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, msg, error]);

  console.log(answers);

  return (
    <Layout>
      <div className="d-flex flex-column mb-3 border-bottom py-3">
        <h5 className="m-0">Kuisioner & Penjadwalan</h5>
        <p className="">Pastikan kuisioner diisi sesuai dengan Pengisi </p>
      </div>

      {data?.ket ? (
        <div className="container-lg my-3">
          <p className="h5">Pengisi: Orang Tua </p>
          <div className="table-responsive">
            <table id="ortu" className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Pertanyaan</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {type1?.map((item, i) => (
                  <tr key={item.id}>
                    <td scope="row">{i + 1}</td>
                    <td style={{ textAlign: "start" }}>
                      <div className="d-flex flex-column gap-2">
                        <p dangerouslySetInnerHTML={createMarkup(item.soal)} />
                        <textarea
                          className="form-control"
                          rows="5"
                          placeholder="Ketikan Jawaban di sini"
                          value={answerType1[item.id] || ""}
                          onChange={(e) =>
                            handleAnswerChange(item.id, e.target.value)
                          }
                        ></textarea>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => addAnswerForType1(item.id)}
                        disabled={isLoading ? true : false}
                      >
                        Simpan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-responsive">
            <table id="ortu" className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Pertanyaan</th>
                  <th scope="col">Ya</th>
                  <th scope="col">Tidak</th>
                </tr>
              </thead>
              <tbody>
                {type2?.map((item, i) => (
                  <tr key={item.id}>
                    <td scope="row">{i + 1}</td>
                    <td style={{ textAlign: "start" }}>
                      <p dangerouslySetInnerHTML={createMarkup(item.soal)} />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="1"
                        id="1"
                        className="form-check-input"
                        value="Ya"
                        checked={
                          answers?.find((a) => a.soal_id === item.id)
                            ?.jawaban === "Ya"
                        }
                        onChange={(e) => addType2_3(item.id, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="2"
                        id="2"
                        className="form-check-input"
                        value="Tidak"
                        checked={
                          answers?.find((a) => a.soal_id === item.id)
                            ?.jawaban === "Tidak"
                        }
                        onChange={(e) => addType2_3(item.id, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="h5">Pengisi: Calon Siswa</p>
          <div className="table-responsive">
            <table id="siswa" className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col" style={{ width: 80 }}>
                    No
                  </th>
                  <th scope="col">Pertanyaan</th>
                  <th scope="col" style={{ width: 80 }}>
                    Ya
                  </th>
                  <th scope="col" style={{ width: 80 }}>
                    Tidak
                  </th>
                </tr>
              </thead>
              <tbody>
                {type3?.map((item, i) => (
                  <tr key={item.id}>
                    <td scope="row">{i + 1}</td>
                    <td style={{ textAlign: "start" }}>
                      <p dangerouslySetInnerHTML={createMarkup(item.soal)} />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="1"
                        id="1"
                        className="form-check-input"
                        value="Ya"
                        checked={
                          answers?.find((a) => a.soal_id === item.id)
                            ?.jawaban === "Ya"
                        }
                        onChange={(e) => addType2_3(item.id, e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="2"
                        id="2"
                        className="form-check-input"
                        value="Tidak"
                        checked={
                          answers?.find((a) => a.soal_id === item.id)
                            ?.jawaban === "Tidak"
                        }
                        onChange={(e) => addType2_3(item.id, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <NotAllowed />
      )}
    </Layout>
  );
};

export default Kuisioner;
