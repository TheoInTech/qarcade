import { readHandler } from "@/api";
import { AO } from "@/lib/config";
import { AOProfileResponseType, ProfileHeaderType } from "@/lib/types";

export async function getProfileByWalletAddress(args: {
  address: string;
}): Promise<ProfileHeaderType | null> {
  const emptyProfile = {
    id: null,
    walletAddress: args.address,
    displayName: null,
    username: null,
    bio: null,
    avatar: null,
    banner: null,
    version: null,
  };

  try {
    const profileLookup = await readHandler({
      processId: AO.profileRegistry,
      action: "Get-Profiles-By-Delegate",
      data: { Address: args.address },
    });

    let activeProfileId: string;
    if (
      profileLookup &&
      Array.isArray(profileLookup) &&
      profileLookup.length > 0 &&
      profileLookup[0].ProfileId
    ) {
      activeProfileId = profileLookup[0].ProfileId;
    } else {
      activeProfileId = "";
    }

    if (activeProfileId) {
      const fetchedProfile = (await readHandler({
        processId: activeProfileId,
        action: "Info",
        data: null,
      })) as unknown as AOProfileResponseType;

      if (fetchedProfile) {
        return {
          id: activeProfileId,
          walletAddress: fetchedProfile.Owner,
          displayName: fetchedProfile.Profile.DisplayName || null,
          username: fetchedProfile.Profile.UserName || null,
          bio: fetchedProfile.Profile.Description || null,
          avatar: fetchedProfile.Profile.ProfileImage || null,
          banner: fetchedProfile.Profile.CoverImage || null,
          version: fetchedProfile.Profile.Version || null,
        };
      } else return emptyProfile;
    } else return emptyProfile;
  } catch (e: unknown) {
    throw new Error(e as string);
  }
}
