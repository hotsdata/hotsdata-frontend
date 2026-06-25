import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { requestForm, requestJson } from "../../api/client.js";
import heroInfoFixture from "../../test/fixtures/hero-info.json";
import loginFixture from "../../test/fixtures/login-success.json";
import playerHeroesFixture from "../../test/fixtures/player-heroes.json";
import playerSearchFixture from "../../test/fixtures/player-search.json";
import replayFixture from "../../test/fixtures/replay-show.json";
import replaysFixture from "../../test/fixtures/replays-list.json";
import teammatesFixture from "../../test/fixtures/teammates.json";
import uploadFixture from "../../test/fixtures/upload-success.json";
import userFixture from "../../test/fixtures/user.json";

function asReplay(data) {
  return Array.isArray(data) ? data[0] : data;
}

function filterPlayers(players, pattern = "") {
  const normalizedPattern = pattern.trim().toLowerCase();
  if (!normalizedPattern) return players;

  return players.filter((player) => {
    return (
      player.name.toLowerCase().includes(normalizedPattern) ||
      player.toonhandle.toLowerCase().includes(normalizedPattern)
    );
  });
}

export const hotsdataApi = createApi({
  reducerPath: "hotsdataApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["User", "Replays", "Player"],
  endpoints: (builder) => ({
    login: builder.mutation({
      async queryFn(credentials) {
        try {
          const data = await requestJson(
            "/login",
            { method: "POST", body: credentials },
            loginFixture,
          );
          if (data?.msg?.toLowerCase().includes("error")) {
            return { error: { message: data.msg } };
          }
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    register: builder.mutation({
      async queryFn(user) {
        try {
          return {
            data: await requestJson(
              "/register",
              { method: "POST", body: user },
              loginFixture,
            ),
          };
        } catch (error) {
          return { error };
        }
      },
    }),
    getUser: builder.query({
      async queryFn() {
        try {
          return { data: await requestJson("/user", {}, userFixture) };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      async queryFn(user) {
        try {
          return {
            data: await requestJson(
              "/user",
              { method: "PUT", body: user },
              { ...userFixture, ...user },
            ),
          };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      async queryFn(payload) {
        try {
          return {
            data: await requestJson(
              `/resetPassword/${encodeURIComponent(payload.email)}/${encodeURIComponent(payload.newPassword)}`,
              { method: "PUT" },
              { msg: "Password updated" },
            ),
          };
        } catch (error) {
          return { error };
        }
      },
    }),
    getReplays: builder.query({
      async queryFn(endpoint) {
        try {
          return {
            data: await requestJson(endpoint || "/list", {}, replaysFixture),
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Replays"],
    }),
    getReplay: builder.query({
      async queryFn(replayId) {
        try {
          const data = await requestJson(`/replays/${replayId}`, {}, [
            replayFixture,
          ]);
          return { data: asReplay(data) };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_result, _error, replayId) => [
        { type: "Replays", id: replayId },
      ],
    }),
    getHeroInfo: builder.query({
      async queryFn() {
        try {
          return { data: await requestJson("/hero_info", {}, heroInfoFixture) };
        } catch (error) {
          return { error };
        }
      },
    }),
    getPlayerHeroes: builder.query({
      async queryFn(toonhandle = "") {
        try {
          return {
            data: await requestJson(
              `/player/heroes/?toonhandle=${encodeURIComponent(toonhandle)}`,
              {},
              playerHeroesFixture,
            ),
          };
        } catch (error) {
          return { error };
        }
      },
      providesTags: (_result, _error, toonhandle) => [
        { type: "Player", id: toonhandle || "current" },
      ],
    }),
    searchPlayers: builder.query({
      async queryFn(pattern = "") {
        try {
          const data = await requestJson(
            `/player/search/${encodeURIComponent(pattern || "all")}`,
            {},
            playerSearchFixture,
          );
          return {
            data: filterPlayers(
              Array.isArray(data) ? data : data.data || [],
              pattern,
            ),
          };
        } catch (error) {
          return { error };
        }
      },
    }),
    getTeammates: builder.query({
      async queryFn() {
        try {
          return {
            data: await requestJson("/player/teammates", {}, teammatesFixture),
          };
        } catch (error) {
          return { error };
        }
      },
    }),
    uploadReplay: builder.mutation({
      async queryFn(file) {
        const formData = new FormData();
        formData.append("replay", file);

        try {
          return {
            data: await requestForm("/upload", formData, uploadFixture),
          };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Replays"],
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useGetHeroInfoQuery,
  useGetPlayerHeroesQuery,
  useGetReplayQuery,
  useGetReplaysQuery,
  useGetTeammatesQuery,
  useGetUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useSearchPlayersQuery,
  useUpdateUserMutation,
  useUploadReplayMutation,
} = hotsdataApi;
